import React from "react";

import "./Model.scss";

function Model(props) {
  return (
    <div className="model">
      <img
        src={props.picture}
        alt={props.fullname}
        className="rounded-circle mb-4"
        width="150"
        height="150"
      />
      <span className="fullname">{props.fullname}</span>
      <a className="instagram-link" href="{props.instagramUsername}">
        @{props.instagramUsername}
      </a>
    </div>
  );
}

export default Model;
