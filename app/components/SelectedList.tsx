import { useSnapshot } from "valtio";
import iconStore from "~/state/IconStore";
import { Icon } from "./Icon";
import { Button } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { debounce } from "~/util/debounce";

const debouncedCss = debounce(async (setCss: (css: string) => void) => {
    if (iconStore.selectedIcons.length === 0) {
        setCss("/* No icons selected */");
        return;
    }
    const css = await fetch(`/generate/${iconStore.selectedIcons.join(",")}`);
    const cssText = await css.text();
    setCss(cssText);
}, 300);

export const SelectedList = () => {
    const [css, setCss] = useState("generatedCSS");
    const textarea = useRef<HTMLTextAreaElement>(null);
    const selectedIcons = useSnapshot(iconStore).selectedIcons;
    useEffect(() => {
        debouncedCss(setCss);
    }, [selectedIcons]);

    return (
        <div>
            <h4>Selected Icons</h4>
            <ul className="list-unstyled d-flex flex-row gap-4 flex-wrap py-3">
                {selectedIcons.map((icon: string) => (
                    <li key={icon} className="d-flex align-items-center gap-1">
                        <Button variant="light" size="sm" onClick={() => iconStore.toggleIconSelection(icon)} className="d-flex flex-column align-items-center">
                            <Icon name={icon} />
                            {icon}
                        </Button>
                    </li>
                ))}
            </ul>
            <h5>Generated CSS</h5>
            <textarea
                className="form-control"
                style={{ width: "100%", height: "300px", fontFamily: "monospace" }}
                value={css}
                readOnly
                ref={textarea}
            />
            <br />
            <Button
                onClick={() => {
                    textarea.current?.select();
                    navigator.clipboard.writeText(css);
                }}
                className="d-flex align-items-center gap-2"
            >
                <i className="iconoir-copy" style={{ fontSize: "1.6em" }}></i>
                Copy CSS to Clipboard
            </Button>
        </div>
    );
};