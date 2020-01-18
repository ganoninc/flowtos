import React from "react";
import { useParams } from "react-router-dom";
import Photos from "./Photos";

function Album(props) {
  const { albumList, photoLibraryEndpoint } = props;

  let { albumId } = useParams();

  let albumData = albumList.find(album => album.name === albumId);

  let photoList = albumData.photos;

  let photos = (
    <Photos photoList={photoList} photoLibraryEndpoint={photoLibraryEndpoint} />
  );

  return (
    <div className="album">
      <h2 className="pb-3">{albumId}</h2>
      {photos}
    </div>
  );
}

export default Album;
