import csv from 'csvtojson';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { EOL } from 'node:os';

export type IconDescription = {
    name: string;
    baseName: string;
    variant: string;
    path: string;
    tags?: readonly string[];
};

export type IconDescriptionFull = IconDescription & {
    data: string;
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const rootDir = path.join(__dirname, '..', '..');
const iconoirDir = process.env.ICONOIR_DIR || "";
console.log('rootDir:', rootDir);
console.log('iconoirDir:', iconoirDir);
const iconsDir = path.join(rootDir, iconoirDir, 'icons');
console.log('iconsDir:', iconsDir);
const iconsCsv = path.join(rootDir, iconoirDir, 'iconoir.com/icons.csv');
const packageJsonPath = path.join(iconoirDir, 'package.json');

const iconsVariants = ['regular', 'solid'];

let cachedIconList: Record<string, IconDescription> = {};
let cachedCategorizedIconList: Record<string, IconDescription[]> = {};

export async function getIconMeta(): Promise<any[]> {
    const rows = await csv().fromFile(iconsCsv);
    return rows;
}

export async function getPackageJson(): Promise<any> {
    const fileString = await fs.readFile(packageJsonPath, { encoding: "utf-8" });
    return JSON.parse(fileString);
}


export const getIcon = async (name: string): Promise<IconDescription | null> => {
    const icons = await getFlatIconList();
    return icons[name] || null;
};

export const getIconFile = async (name: string): Promise<string | null> => {
    const icon = await getIcon(name);
    if (!icon) {
        return "<svg>missing icon</svg>";
    }

    const fileString = await fs.readFile(icon.path, { encoding: "utf-8" });
    return fileString;
};

export const getIconAsDataUrl = async (name: string) => {
    const string = await getIconFile(name);
    if (!string) return null;
    const sanatizedString = string.replaceAll(EOL, '')
        .replace(/(width|height)="\d+px"/g, '')
        .replace(/ +/g, ' ');
    return `data:image/svg+xml;charset=utf-8,${sanatizedString}`;
};

export const getCategorizedIconList = async () => {
    if (Object.keys(cachedCategorizedIconList).length > 0) {
        return cachedCategorizedIconList;
    }
    const flatList = await getFlatIconList();
    const meta = await getIconMeta();
    const categorizedList: Record<string, IconDescriptionFull[]> = {};
    for (const item of meta) {
        const { filename, category, tags } = item;
        const tagList = tags ? tags.split(',').map((tag: string) => tag.trim()) : [];
        if (!categorizedList[category]) {
            categorizedList[category] = [];
        }
        if (flatList[filename]) {
            categorizedList[category].push({ ...flatList[filename], tags: tagList, data: await getIconFile(filename) || '' });
        }
        if (flatList[filename + '-solid']) {
            categorizedList[category].push({ ...flatList[filename + '-solid'], tags: tagList, data: await getIconFile(filename + '-solid') || '' });
        }
    }
    cachedCategorizedIconList = categorizedList;
    return categorizedList;
};

export const getFlatIconList = async (): Promise<Record<string, IconDescription>> => {

    if (Object.keys(cachedIconList).length > 0) {
        return cachedIconList;
    }

    const iconList = {} as Record<string, IconDescription>;

    const iconsVariantsDirs = Object.fromEntries(
        iconsVariants.map((variant) => [
            variant,
            path.join(iconsDir, variant),
        ]),
    );

    for (const [variant, dir] of Object.entries(iconsVariantsDirs)) {
        const files = await fs.readdir(dir);
        const icons = files
            .filter((file) => file.endsWith('.svg'))
            .map((file) => {
                const name = path.parse(file).name;
                return {
                    name,
                    path: path.join(dir, file),
                };
            });
        const suffix = variant === 'regular' ? '' : `-${variant}`;
        for (const icon of icons) {
            const name = icon.name + suffix;
            iconList[name] = {
                name,
                baseName: icon.name,
                variant: variant,
                path: icon.path
            };
        }

    }
    cachedIconList = iconList;
    return iconList;
};
