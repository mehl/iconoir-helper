import { getGeneratedCSS } from "~/services/generateCSS";
import type { Route } from "./+types/generateCss";
export async function loader({ params }: Route.LoaderArgs) {
    const { selectedNames } = params;
    const iconList = selectedNames.split(',');
    const cssString = await getGeneratedCSS(iconList);

    // Als Response zurückgeben
    return new Response(cssString, {
        headers: {
            "Content-Type": "text/css",
        },
    });
}
