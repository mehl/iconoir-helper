import type { Route } from "./+types/home";
import { Home } from "../home/home";
import { getCategorizedIconList, getFlatIconList, getIconMeta } from "~/services/iconServices";
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
  return { iconlist, iconMeta, categorizedIcons };
}

export default function HomeRoute() {
  const { iconlist, iconMeta, categorizedIcons } = useLoaderData();
  useEffect(() => {
    iconStore.categorizedIcons = categorizedIcons;
  }, [categorizedIcons]);
  return <Home />;
}
