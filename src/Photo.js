import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
      {/* <img alt={photo.title} {...photo} onClick={onClickHandler} /> */}
      <LazyLoadImage
        alt={photo.title}
        scrollPosition={scrollPosition}
        {...photo}
      />
    </div>
  );
}

export default Photo;
