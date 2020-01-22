import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "react-lazy-load-image-component/src/effects/blur.css";

function Photo(props) {
  const { photo, index, margin, onClick, scrollPosition } = props;

  let styles = {
    margin: margin,
    width: photo.width,
    height: photo.height,
    overflow: "hidden",
    cursor: "pointer"
  };

  let onClickHandler = e => {
    onClick(e, { photo, index });
  };

  return (
    <div style={styles}>
      <LazyLoadImage
        alt={photo.title}
        scrollPosition={scrollPosition}
        onClick={onClickHandler}
        {...photo}
      />
    </div>
  );
}

export default Photo;
