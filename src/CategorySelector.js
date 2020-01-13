import React from 'react';
import Nav from 'react-bootstrap/Nav'

function CategorySelector(props) {
    return (
        <>
            <Nav className="justify-content-center pt-2" activeKey={props.selected}>
                <Nav.Item>
                    <Nav.Link href="/" eventKey="latest-photos">Latest Photos</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/albums" eventKey="albums">Albums</Nav.Link>
                </Nav.Item>
            </Nav>
        </>
    );
}

export default CategorySelector;