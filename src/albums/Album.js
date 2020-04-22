import React from "react";
import { useParams } from "react-router-dom";
import Photos from "../photos/Photos";

function Album(props) {
  const { albumList, photoLibraryEndpoint } = props;

  let { albumId } = useParams();

  let albumData = albumList.find(
    album => album.encodedName === encodeURI(albumId)
  );

  let photoList = albumData.photos;

  let photos = (
    <Photos photoList={photoList} photoLibraryEndpoint={photoLibraryEndpoint} />
  );

  return (
    <div className="album">
      <h3 className="pb-3">{albumData.name}</h3>
      {photos}
    </div>
  );
}

export default Album;
