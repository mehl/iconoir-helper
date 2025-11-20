import { useState } from "react";
import iconStore from "~/state/IconStore";

export function Icon({ name }: { name: string; }) {
    const icon = iconStore.icons[name];

    return <div
        dangerouslySetInnerHTML={icon?.data ? { __html: icon.data } : undefined}
        style={{ width: "32px", height: "32px", overflow: "hidden" }}
    />;
}