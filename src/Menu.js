import React from "react";
import Nav from "react-bootstrap/Nav";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./Menu.scss";

function Menu(props) {
  const { displayAlbums } = props;
  let navigate = useNavigate();

  let onSelectHandler = (selectedKey) => {
    if (selectedKey === "latest-photos") navigate("/");
    else if (selectedKey === "albums") navigate("/albums");
    else if (selectedKey === "about") navigate("/about");
  };

  let getNavbar = (activeItem) => {
    return (
      <div className="menu">
        <Nav
          className="justify-content-center pt-2"
          activeKey={activeItem}
          onSelect={onSelectHandler}
        >
          <Nav.Item>
            <Nav.Link eventKey="latest-photos">Latest Photos</Nav.Link>
          </Nav.Item>
          {displayAlbums ? (
            <Nav.Item>
              <Nav.Link eventKey="albums">Albums</Nav.Link>
            </Nav.Item>
          ) : null}
          <Nav.Item>
            <Nav.Link eventKey="about">About</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    );
  };

  return (
    <div className="category-selector">
      <Routes>
        <Route path="/photos/:photoId" element={getNavbar("latest-photos")} />
        <Route path="/albums/*" element={getNavbar("albums")} />
        <Route path="/about" element={getNavbar("about")} />
        <Route path="/" element={getNavbar("latest-photos")} />
      </Routes>
    </div>
  );
}

export default Menu;
