import React from "react";
import { useHistory } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "./AlbumCard.scss";

function AlbumCard(props) {
  const { name, cover, cover2x, scrollPosition, placeholderSrc } = props;
  let history = useHistory();

  let openAlbum = () => {
    history.push("/albums/" + name);
  };

  return (
    <div className="mb-4 col-xs-12 col-sm-12 col-md-3">
      <div className="album-card" onClick={openAlbum}>
        <LazyLoadImage
          alt={name}
          scrollPosition={scrollPosition}
          effect="blur"
          placeholderSrc={placeholderSrc}
          src={cover}
          className="cover"
          srcSet={cover + " 1x, " + cover2x + " 2x"}
        />
        <span className="py-2 name">{name}</span>
      </div>
    </div>
  );
}

export default AlbumCard;
