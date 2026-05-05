import { useSnapshot } from "valtio";
import iconStore from "~/state/IconStore";
import { Icon } from "./Icon";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { debounce } from "~/util/debounce";

const cssSelectorPattern = /\.iconoir-([a-z0-9-]+)::before\b/i;

type ImportParseResult =
    | { ok: true; parsedIcons: string[] }
    | { ok: false; error: string };

const parseImportedSelection = (
    input: string,
    availableIcons: Set<string>,
): ImportParseResult => {
    const parsedIcons: string[] = [];
    const lines = input
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);

    if (lines.length === 0) {
        return {
            ok: false,
            error: "Paste at least one icon name or CSS selector.",
        };
    }

    for (const line of lines) {
        const cssMatch = line.match(cssSelectorPattern);

        if (cssMatch) {
            parsedIcons.push(cssMatch[1]);
            continue;
        }

        if (availableIcons.has(line)) {
            parsedIcons.push(line);
        }
    }

    if (parsedIcons.length === 0) {
        return { ok: false, error: "No importable icon names were found." };
    }

    return { ok: true, parsedIcons };
};

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
    const [showImportModal, setShowImportModal] = useState(false);
    const [importText, setImportText] = useState("");
    const [importError, setImportError] = useState("");
    const textarea = useRef<HTMLTextAreaElement>(null);
    const { selectedIcons, icons } = useSnapshot(iconStore);

    useEffect(() => {
        debouncedCss(setCss);
    }, [selectedIcons]);

    const openImportModal = () => {
        setImportText("");
        setImportError("");
        setShowImportModal(true);
    };

    const closeImportModal = () => {
        setShowImportModal(false);
        setImportError("");
    };

    const handleImport = () => {
        const availableIcons = new Set(Object.keys(icons));
        const result = parseImportedSelection(importText, availableIcons);

        if (!result.ok) {
            setImportError(result.error);
            return;
        }

        iconStore.setSelectedIcons(result.parsedIcons);
        setShowImportModal(false);
        setImportText("");
        setImportError("");
    };

    return (
        <div>
            <p>
                <b>ICONOIR Helper</b> makes it easy to select icons from the fantastic <a href="https://iconoir.com/" target="_blank" rel="noopener noreferrer">iconoir</a> library and generate a customized CSS for use in your projects. Just click on the icons you want to include, and the CSS will be generated automatically below.
            </p>
            <div className="mb-3">
                <Button
                    variant="outline-primary"
                    onClick={openImportModal}
                    className="w-100"
                >
                    Import Selection
                </Button>
            </div>
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

            <Modal show={showImportModal} onHide={closeImportModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Import Selection</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="selectionImportTextarea">
                            <Form.Label>
                                Paste one icon name per line, or your previously generated CSS.
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={10}
                                value={importText}
                                onChange={(event) => {
                                    setImportText(event.target.value);
                                    if (importError) {
                                        setImportError("");
                                    }
                                }}
                                placeholder={
                                    "stats-up-square\nheart\n\n.iconoir-camera::before{...}"
                                }
                            />
                        </Form.Group>
                        {importError ? (
                            <Alert variant="danger" className="mt-3 mb-0 py-2">
                                {importError}
                            </Alert>
                        ) : null}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeImportModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleImport}>
                        Import
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
