import { Button } from "react-bootstrap";
import { Icon } from "./Icon";

export const IconButton = ({ name, onClick, active }: { name: string; onClick?: () => void; active?: boolean; }) => {
    return (
        <Button variant={active ? "primary" : "outline-secondary"} onClick={onClick}>
            <Icon name={name} />
        </Button>
    );
};