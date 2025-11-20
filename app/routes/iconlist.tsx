import { getIconFile } from "~/services/iconServices";
import type { Route } from "./+types/icon";
export async function loader({ params }: Route.LoaderArgs) {
    const { name } = params;

    const file = await getIconFile(name);

    // Als Response zurückgeben
    return new Response(file, {
        headers: {
            "Content-Type": "image/svg+xml",
        },
    });
}
