import React from "react";

import "./Model.scss";

function Model(props) {
  return (
    <div className="d-flex flex-column justify-content-center my-4 mx-3 model">
      <img
        src={props.picture}
        alt={props.fullname}
        className="img-thumbnail mb-2"
        width="125"
        height="125"
      />
      <span className="fullname">{props.fullname}</span>
      <a className="instagram-link" href="{props.instagramUsername}">
        @{props.instagramUsername}
      </a>
    </div>
  );
}

export default Model;
