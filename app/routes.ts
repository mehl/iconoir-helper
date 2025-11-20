import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
    route("imprint", "routes/imprint.tsx"),
    route("icon/:name", "routes/icon.tsx"),
    route("generate/:selectedNames", "routes/generateCss.tsx"),
] satisfies RouteConfig;
