import React from "react";
import AlbumCard from "./AlbumCard";

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
    <div className="row justify-content-center">{albumListComponents}</div>
  );
}

export default Albums;
