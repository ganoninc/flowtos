import React from "react";
import Nav from "react-bootstrap/Nav";
import { Switch, Route, useHistory } from "react-router-dom";

import "./Menu.scss";

function Menu(props) {
  const { displayAlbums } = props;
  let history = useHistory();

  let onSelectHandler = selectedKey => {
    if (selectedKey === "latest-photos") history.push("/");
    else if (selectedKey === "albums") history.push("/albums");
    else if (selectedKey === "about") history.push("/about");
  };

  let getNavbar = activeItem => {
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
      <Switch>
        <Route path="/photos/:photoId">{getNavbar("latest-photos")}</Route>
        <Route path="/albums">{getNavbar("albums")}</Route>
        <Route path="/about">{getNavbar("about")}</Route>
        <Route path="/">{getNavbar("latest-photos")}</Route>
      </Switch>
    </div>
  );
}

export default Menu;
