import { proxy, subscribe } from "valtio";
import { subscribeKey } from "valtio/utils";
import type { IconDescription, IconDescriptionFull } from "~/services/iconServices";
import { debounce } from "~/util/debounce";


const iconStore = proxy({
    version: "",
    searchTerm: "",
    categorizedIcons: {} as Record<string, IconDescriptionFull[]>,
    filteredCategorizedIcons: {} as Record<string, IconDescriptionFull[]>,
    selectedIcons: [] as string[],
    setSearchTerm(term: string) {
        this.searchTerm = term;
    },
    toggleIconSelection(iconName: string) {
        const index = this.selectedIcons.indexOf(iconName);
        if (index === -1) {
            this.selectedIcons.push(iconName);
        } else {
            this.selectedIcons.splice(index, 1);
        }
    },
    get icons(): Record<string, IconDescriptionFull> {
        const gfx: Record<string, IconDescriptionFull> = {};
        for (const icons of Object.values(this.categorizedIcons)) {
            for (const icon of icons) {
                gfx[icon.name] = icon;
            }
        }
        return gfx;
    }
});

const debouncedFiltering = debounce(() => {
    const term = iconStore.searchTerm.toLowerCase();
    if (!term) {
        iconStore.filteredCategorizedIcons = iconStore.categorizedIcons;
        return;
    }
    const filtered: Record<string, IconDescriptionFull[]> = {};
    for (const [category, icons] of Object.entries(iconStore.categorizedIcons)) {
        const matchedIcons = icons.filter(icon => icon.name.toLowerCase().includes(term));
        if (matchedIcons.length > 0) {
            filtered[category] = matchedIcons;
        }
    }
    iconStore.filteredCategorizedIcons = filtered;
}, 300);

subscribeKey(iconStore, "searchTerm", debouncedFiltering);
subscribeKey(iconStore, "categorizedIcons", debouncedFiltering);

// Load and save state to localStorage
if (typeof window !== "undefined") {
    subscribe(iconStore, () => {
        const saveState = {
            selectedIcons: iconStore.selectedIcons,
            searchTerm: iconStore.searchTerm,
        };
        localStorage.setItem("iconoir-helper-state", JSON.stringify(saveState));
    });
    const savedState = localStorage.getItem("iconoir-helper-state");
    if (savedState) {
        try {
            const parsed = JSON.parse(savedState);
            if (Array.isArray(parsed.selectedIcons)) {
                iconStore.selectedIcons = parsed.selectedIcons;
            }
            if (typeof parsed.searchTerm === "string") {
                iconStore.searchTerm = parsed.searchTerm;
            }
        } catch (e) {
            console.error("Failed to parse saved state:", e);
        }
    }
}

export default iconStore;