import { Badge, Button, FormControl, Nav, Navbar } from "react-bootstrap";
import { Form } from "react-router";
import { styled } from "styled-components";
import { useSnapshot } from "valtio";
import iconStore from "~/state/IconStore";

const GridContainerSidebar = styled("div")`
    display: grid;
    grid-template-areas:
        "header header"
        "content sidebar"
    ;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr;
    height: 100vh;
    .page-header {
        grid-area: header;
    }
    .page-sidebar {
        grid-area: sidebar;
        background-color: #f8f9fa;
        padding: 1rem;
        border-right: 1px solid #dee2e6;
        overflow-y: auto;
    }
    .page-content {
        grid-area: content;
        padding: 1rem;
        overflow-y: auto;
        min-width: 40vw;
    }
`;
const GridContainer = styled("div")`
    display: grid;
    grid-template-areas:
        "header"
        "content"
    ;
    grid-template-rows: auto 1fr;
    grid-template-columns: 1fr;
    height: 100vh;
    .page-header {
        grid-area: header;
    }
    .page-content {
        grid-area: content;
        padding: 1rem;
    }
`;

export const PageLayout = ({ children, sidebar, showSearch }: { children: React.ReactNode; sidebar?: React.ReactNode; showSearch?: boolean; }) => {
    const { searchTerm } = useSnapshot(iconStore);
    const navbar = <Navbar expand="md" bg="dark" variant="dark" className="px-3">
        <Navbar.Collapse id="nav">
            {showSearch &&
                <>
                    <Form className="d-flex" role="search">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            value={searchTerm}
                            onChange={(e) => {
                                iconStore.setSearchTerm(e.target.value);
                            }}
                        />
                    </Form>
                    {iconStore.version &&
                        <Nav.Item>
                            <Badge bg="info" text="dark" className="me-2">
                                iconoir {iconStore.version}
                            </Badge>
                        </Nav.Item>
                    }
                </>
            }
            <Nav className="ms-auto">
                <Nav.Link href="/">Icons</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
                <Nav.Link href="/imprint">Imprint</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        <Navbar.Brand className="ms-2">
            ICONOIR Helper
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="nav" />
    </Navbar>;
    if (sidebar) {
        return (
            <GridContainerSidebar>
                <div className="page-header">
                    {navbar}
                </div>
                <div className="page-content p-3">
                    {children}
                </div>
                <div className="page-sidebar">
                    {sidebar}
                </div>
            </GridContainerSidebar>
        );
    }
    return <GridContainer>
        <div className="page-header">
            {navbar}
        </div>
        <div className="page-content p-3">
            {children}
        </div>
    </GridContainer>;

};