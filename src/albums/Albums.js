import React from "react";
import { CSSTransition } from "react-transition-group";
import { trackWindowScroll } from "react-lazy-load-image-component";
import AlbumCard from "./AlbumCard";

import "./Albums.scss";

function Albums(props) {
  const { albumList, sharedPhotosData, photoLibraryEndpoint, scrollPosition } =
    props;

  let albumListComponents = albumList.map((album) => {
    var photoData = sharedPhotosData[album.photos[0].sharedPhotosDataIndex];
    let coverImg = photoLibraryEndpoint + photoData.thumbnailUrl;
    let coverImg2x = photoLibraryEndpoint + photoData.thumbnail2xUrl;
    let placeholderSrc = photoData.blurredThumbnailPlaceholderUrl;

    return (
      <AlbumCard
        key={album.name}
        cover={coverImg}
        cover2x={coverImg2x}
        placeholderSrc={placeholderSrc}
        name={album.name}
        encodedName={album.encodedName}
        scrollPosition={scrollPosition}
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

export default trackWindowScroll(Albums);
