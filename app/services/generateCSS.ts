import { getIconAsDataUrl } from './iconServices';
import headerFile from "./header.css?raw";

export const getGeneratedCSS = async (selectedIcons: string[]) => {
    const header = headerFile.replace('[YEAR]', String(new Date().getFullYear()));

    const mainCssContent = [header];

    for (const iconName of selectedIcons) {
        const dataUrl = await getIconAsDataUrl(iconName);
        const cssContent = `{mask-image:url('${dataUrl}');}`;
        mainCssContent.push(`.iconoir-${iconName}::before${cssContent}`);
    }

    return mainCssContent.join("\n");
};
