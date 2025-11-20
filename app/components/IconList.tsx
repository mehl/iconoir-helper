import { useState } from "react";
import { Button } from "react-bootstrap";
import { useSnapshot } from "valtio";
import { IconButton } from "~/components/IconButton";
import type { IconDescription } from "~/services/iconServices";
import iconStore from "~/state/IconStore";

const MAX_ICONS_DISPLAYED = 10;
export function IconList({ iconlist }: { iconlist: Readonly<IconDescription>[]; }) {
    const { selectedIcons, searchTerm } = useSnapshot(iconStore);
    const [showAll, setShowAll] = useState(false);
    const handleClick = (icon: IconDescription) => {
        console.log("Icon list clicked", icon);
        iconStore.toggleIconSelection(icon.name);
    };
    return (
        <div className="d-flex flex-wrap gap-2 justify-content-start align-items-center my-2" style={{ maxWidth: "50vw", minWidth: "40vw" }}>
            {iconlist?.map((icon, index) => {
                if (!showAll && index === MAX_ICONS_DISPLAYED) {
                    return "…";
                }
                if (!showAll && (index > MAX_ICONS_DISPLAYED)) return null;
                return <IconButton
                    key={icon.name}
                    name={icon.name}
                    onClick={() => handleClick(icon)}
                    active={selectedIcons.includes(icon.name)}
                />;
            })}
            {iconlist.length > MAX_ICONS_DISPLAYED && <Button onClick={() => {
                setShowAll(!showAll);
            }}>
                {showAll ?
                    "Hide"
                    :
                    `Show +${iconlist.length - MAX_ICONS_DISPLAYED} more…`
                }
            </Button>}
        </div>
    );
}
