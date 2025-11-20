import { useEffect, useState } from "react";

const list = [
    "emoji-quite",
    "emoji-look-left",
    "circle",
    "emoji-look-right",
];

export const Anim = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % list.length);
        }, 200);
        return () => clearInterval(interval);
    }, []);
    return <i className={`iconoir-${list[index]}`} style={{ fontSize: "48px" }}></i>;
};