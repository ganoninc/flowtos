import React from "react";
import ReactDOM from "react-dom";
import "./custom.scss";
import "./index.css";
import Flowtos from "./Flowtos";
import * as serviceWorker from "./serviceWorker";

let photoLibraryEndpoint =
  "https://giovanetti.fr/flowtos/photo-library-ressources/";
if (process.env.NODE_ENV !== "production") {
  photoLibraryEndpoint = "/photo-library-ressources/";
}

ReactDOM.render(
  <Flowtos photoLibraryEndpoint={photoLibraryEndpoint} />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
