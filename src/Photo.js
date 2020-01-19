import React from "react";

function Photo(props) {
  const { photo, index, margin, onClick } = props;

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
      <img alt={photo.title} {...photo} onClick={onClickHandler} />
    </div>
  );
}

export default Photo;
