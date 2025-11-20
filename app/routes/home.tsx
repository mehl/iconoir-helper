import type { Route } from "./+types/home";
import { Home } from "../home/home";
import { getCategorizedIconList, getFlatIconList, getIconMeta, getPackageJson } from "~/services/iconServices";
import { useLoaderData } from "react-router";
import { useEffect } from "react";
import iconStore from "~/state/IconStore";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "ICONOIR Helper" },
    { name: "description", content: "Welcome to ICONOIR Helper!" },
  ];
}

export async function loader({ }: Route.LoaderArgs) {
  const iconlist = await getFlatIconList();
  const iconMeta = await getIconMeta();
  const categorizedIcons = await getCategorizedIconList();
  const packageJson = await getPackageJson();
  return { iconlist, iconMeta, categorizedIcons, version: packageJson.version };
}

export default function HomeRoute() {
  const { iconlist, iconMeta, categorizedIcons, version } = useLoaderData();
  useEffect(() => {
    iconStore.version = version;
    iconStore.categorizedIcons = categorizedIcons;
  }, [categorizedIcons, version]);
  return <Home />;
}
