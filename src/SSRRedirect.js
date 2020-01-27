import React from "react";
import { useParams, useHistory } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";

function SSRRedirect(props) {
  let history = useHistory();
  let { photoId, albumId } = useParams();

  if (albumId && photoId) {
    history.push("/albums/" + albumId + "/" + photoId);
  } else if (photoId) {
    history.push("/photos/" + photoId);
  } else {
    history.push("/");
  }

  return <LoadingIndicator></LoadingIndicator>;
}

export default SSRRedirect;
