import React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga4";
import "./custom.scss";
import "./index.css";
import Flowtos from "./Flowtos";
//import * as serviceWorker from "./serviceWorker";

ReactGA.initialize("G-NKHEEYGE2L");

let photoLibraryEndpoint =
  process.env.PUBLIC_URL + "/photo-library-ressources/";

ReactDOM.render(
  <Flowtos photoLibraryEndpoint={photoLibraryEndpoint} />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
