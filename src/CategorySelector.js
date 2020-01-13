import React from 'react';
import Nav from 'react-bootstrap/Nav'
import {
    useHistory
} from "react-router-dom";

function CategorySelector(props) {
    let history = useHistory();

    let onSelectHandler = (selectedKey) => {
        if (selectedKey === "latest-photos")
            history.push("/");
        else if (selectedKey === "albums")
            history.push("/albums");
    };

    return (
        <>
            <Nav className="justify-content-center pt-2" activeKey={props.selected} onSelect={onSelectHandler}>
                <Nav.Item>
                    <Nav.Link eventKey="latest-photos">Latest Photos</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="albums">Albums</Nav.Link>
                </Nav.Item>
            </Nav>
        </>
    );
}

export default CategorySelector;