import React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga";
import "./custom.scss";
import "./index.css";
import Flowtos from "./Flowtos";
import * as serviceWorker from "./serviceWorker";

ReactGA.initialize("UA-156968412-1");

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
