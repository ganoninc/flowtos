import React from "react";
import { CSSTransition } from "react-transition-group";
import AlbumCard from "./AlbumCard";

import "./Albums.scss";

function Albums(props) {
  const { albumList, photoLibraryEndpoint } = props;

  let albumListComponents = albumList.map(album => {
    let coverImg = photoLibraryEndpoint + album.photos[0].thumbnailUrl;
    let coverImg2x = photoLibraryEndpoint + album.photos[0].thumbnail2xUrl;

    return (
      <AlbumCard
        key={album.name}
        cover={coverImg}
        cover2x={coverImg2x}
        name={album.name}
      />
    );
  });

  return (
    <CSSTransition in={true} timeout={0} classNames="fade" appear>
      <div className="row justify-content-center albums">
        {albumListComponents}
      </div>
    </CSSTransition>
  );
}

export default Albums;
