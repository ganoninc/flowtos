import React from "react";
import { useParams, useHistory, useRouteMatch } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";

function SSRRedirect(props) {
  let history = useHistory();
  let { photoId, albumId } = useParams();

  let isAboutPage = useRouteMatch({
    path: "/ssr/about",
    strict: false,
    sensitive: false
  });

  let isAlbumsPage = useRouteMatch({
    path: "/ssr/albums",
    strict: true,
    sensitive: false
  });

  console.log(photoId);
  console.log(albumId);

  if (albumId && photoId) {
    history.push("/albums/" + albumId + "/" + photoId);
  } else if (albumId) {
    history.push("/albums/" + albumId);
  } else if (isAlbumsPage) {
    history.push("/albums");
  } else if (photoId) {
    history.push("/photos/" + photoId);
  } else if (isAboutPage) {
    history.push("/about");
  } else {
    //history.push("/");
  }

  return <LoadingIndicator></LoadingIndicator>;
}

export default SSRRedirect;
