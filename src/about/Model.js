import React from "react";

import "./Model.scss";

function Model(props) {
  const { instagramUsername, picture, picture2x, fullname } = props;

  let getInstagramLink = () => {
    if (instagramUsername) {
      return (
        <a
          className="instagram-link"
          href={"https://www.instagram.com/" + instagramUsername}
          rel="noopener noreferrer"
          target="_blank"
        >
          @{instagramUsername}
        </a>
      );
    }
  };

  return (
    <div className="d-flex flex-column align-items-start my-4 mx-3 model">
      <img
        src={picture}
        alt={fullname}
        srcSet={picture + " 1x, " + picture2x + " 2x"}
        sizes="125px"
        className="img-thumbnail mb-2 picture"
        width="125"
        height="125"
      />
      <div className="d-flex flex-column justify-content-center label">
        <span className="fullname">{fullname}</span>
        {getInstagramLink()}
      </div>
    </div>
  );
}

export default Model;
