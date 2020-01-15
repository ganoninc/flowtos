import React, { useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import Gallery from "react-photo-gallery";
import FsLightbox from "fslightbox-react";

import "./Photos.scss";

function Photos(props) {
  let history = useHistory();
  let { photoId, albumId } = useParams();

  // remapping of the photo list
  let photoThumbnails = props.photoList.map(photo => {
    return {
      src: props.photoLibraryEndpoint + photo.thumbnailUrl,
      srcSet: [
        props.photoLibraryEndpoint + photo.thumbnailUrl + " 1x",
        props.photoLibraryEndpoint + photo.thumbnail2xUrl + " 2x"
      ],
      width: photo.width,
      height: photo.height,
      key: photo.id.toString()
    };
  });
  let photos = props.photoList.map(
    photo => props.photoLibraryEndpoint + photo.photoUrl
  );

  let [lightboxController, setLightboxController] = useState({
    toggler: false,
    sourceIndex: photoThumbnails.findIndex(
      photoThumbnail => photoThumbnail.key === photoId
    )
  });

  let openLightboxOnSlide = useCallback(
    (event, { photo, index }) => {
      if (albumId) {
        history.push("/albums/" + albumId + "/" + photo.key);
      } else {
        history.push("/photos/" + photo.key);
      }
      setLightboxController({
        toggler: !lightboxController.toggler,
        sourceIndex: index
      });
    },
    [history, lightboxController, albumId]
  );

  let onLightBoxCloseHandler = () => {
    if (albumId) {
      history.push("/albums/" + albumId);
    } else {
      history.push("/");
    }
  };

  return (
    <div className="photos">
      <Gallery
        photos={photoThumbnails}
        onClick={openLightboxOnSlide}
        margin={2}
      />
      <FsLightbox
        toggler={lightboxController.toggler}
        sources={photos}
        type="image"
        sourceIndex={lightboxController.sourceIndex}
        openOnMount={photoId ? true : false}
        onClose={onLightBoxCloseHandler}
      />
    </div>
  );
}

export default Photos;
