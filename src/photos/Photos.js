import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Gallery from "react-photo-gallery";
import FsLightbox from "fslightbox-react";
import { trackWindowScroll } from "react-lazy-load-image-component";
import InfiniteScroll from "react-infinite-scroll-component";
import Photo from "./Photo";

import "./Photos.scss";

function Photos(props) {
  const { photoList, photoLibraryEndpoint, scrollPosition } = props;
  let navigate = useNavigate();
  let { photoId, albumId } = useParams();

  // remapping of the photo list
  let photoThumbnails = photoList.map((photo) => {
    return {
      src: photoLibraryEndpoint + photo.thumbnailUrl,
      srcSet: [
        photoLibraryEndpoint + photo.thumbnailUrl + " 1x",
        photoLibraryEndpoint + photo.thumbnail2xUrl + " 2x",
      ],
      width: photo.width,
      height: photo.height,
      key: photo.id.toString(),
      placeholderSrc: photo.blurredThumbnailPlaceholderUrl,
    };
  });
  //#Source https://bit.ly/2neWfJ2
  const chunk = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  let photoThumbnailsChunks = chunk(photoThumbnails, 50);

  const [infiniteScrollerController, setInfiniteScrollerController] = useState({
    currentItems: [photoThumbnailsChunks[0]],
    hasMoreItems: true,
    itemToLoadOnNextCall: 1,
  });

  let loadNextItems = () => {
    if (
      infiniteScrollerController.currentItems.length ===
      photoThumbnailsChunks.length
    ) {
      setInfiniteScrollerController({
        currentItems: infiniteScrollerController.currentItems,
        hasMoreItems: false,
        itemToLoadOnNextCall: infiniteScrollerController.itemToLoadOnNextCall,
      });
    } else {
      let newCurrentItems = infiniteScrollerController.currentItems;
      let itemToLoad = infiniteScrollerController.itemToLoadOnNextCall;
      newCurrentItems.push(photoThumbnailsChunks[itemToLoad]);
      setInfiniteScrollerController({
        currentItems: newCurrentItems,
        hasMoreItems: true,
        itemToLoadOnNextCall: itemToLoad + 1,
      });
    }
  };

  let photos = photoList.map((photo) => {
    if (window.devicePixelRatio > 1) {
      return photoLibraryEndpoint + photo.photo2xUrl;
    } else {
      return photoLibraryEndpoint + photo.photoUrl;
    }
  });
  let [lightboxController, setLightboxController] = useState({
    toggler: false,
    sourceIndex: photoThumbnails.findIndex(
      (photoThumbnail) => photoThumbnail.key === photoId
    ),
  });

  let openLightboxOnSlide = (event, { photo, index }) => {
    if (albumId) {
      navigate("/albums/" + albumId + "/" + photo.key);
    } else {
      navigate("/photos/" + photo.key);
    }
    setLightboxController({
      toggler: !lightboxController.toggler,
      sourceIndex: photoThumbnails.findIndex(
        (photoThumbnail) => photoThumbnail.key === photo.key
      ),
    });
  };

  let onLightBoxCloseHandler = () => {
    if (albumId) {
      navigate("/albums/" + albumId);
    } else {
      navigate("/");
    }
  };

  let imageRenderer = ({ margin, index, left, top, key, photo, onClick }) => (
    <Photo
      key={key}
      margin={margin}
      index={index}
      photo={photo}
      left={left}
      top={top}
      onClick={onClick}
      scrollPosition={scrollPosition}
    />
  );

  let infiniteScrollItems = [];
  infiniteScrollerController.currentItems.map((item, index) => {
    return infiniteScrollItems.push(
      <div key={index} className="photos-chunk">
        <Gallery
          photos={item}
          onClick={openLightboxOnSlide}
          margin={4}
          renderImage={imageRenderer}
        />
      </div>
    );
  });

  return (
    <div className="mb-4 photos">
      <FsLightbox
        toggler={lightboxController.toggler}
        sources={photos}
        type="image"
        sourceIndex={lightboxController.sourceIndex}
        openOnMount={photoId ? true : false}
        onClose={onLightBoxCloseHandler}
      />
      <InfiniteScroll
        dataLength={infiniteScrollerController.currentItems.length}
        next={loadNextItems}
        hasMore={infiniteScrollerController.hasMoreItems}
      >
        {infiniteScrollItems}
      </InfiniteScroll>
    </div>
  );
}

export default trackWindowScroll(Photos);
