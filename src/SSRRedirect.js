import React from "react";
import { useParams, useMatch, Navigate } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";

function SSRRedirect(props) {
  let { photoId, albumId } = useParams();

  let isAboutPage = useMatch({
    path: "/ssr/about",
    strict: false,
    sensitive: false,
  });

  let isAlbumsPage = useMatch({
    path: "/ssr/albums",
    strict: true,
    sensitive: false,
  });

  let navigateTo = "/";

  if (albumId && photoId) {
    navigateTo = "/albums/" + albumId + "/" + photoId;
  } else if (albumId) {
    navigateTo = "/albums/" + albumId;
  } else if (isAlbumsPage) {
    navigateTo = "/albums";
  } else if (photoId) {
    navigateTo = "/photos/" + photoId;
  } else if (isAboutPage) {
    navigateTo = "/about";
  }

  return (
    <>
      <LoadingIndicator></LoadingIndicator>
      <Navigate to={navigateTo} replace />
    </>
  );
}

export default SSRRedirect;
