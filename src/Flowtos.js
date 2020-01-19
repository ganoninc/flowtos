import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";
import Menu from "./Menu";
import Photos from "./Photos";
import Albums from "./Albums";
import Album from "./Album";
import About from "./About";

import "./Flowtos.scss";

function Flowtos(props) {
  const { photoLibraryEndpoint } = props;

  const [
    photoLibraryIndexLoadingStatus,
    setPhotoLibraryIndexLoadingStatus
  ] = useState({
    hasError: false,
    error: null,
    isLoaded: false
  });

  const [photoLibraryIndex, setPhotoLibraryIndex] = useState({
    allPhotos: [],
    albums: [],
    models: []
  });

  useEffect(() => {
    async function fetchPhotoLibraryIndex() {
      const res = await fetch(photoLibraryEndpoint + "index.json");
      res
        .json()
        .then(photoLibraryIndex => {
          setPhotoLibraryIndex({
            allPhotos: photoLibraryIndex.all_photos,
            albums: photoLibraryIndex.albums,
            models: photoLibraryIndex.credits.models
          });

          setPhotoLibraryIndexLoadingStatus({
            hasError: false,
            error: null,
            isLoaded: true
          });
        })
        .catch(error => {
          setPhotoLibraryIndexLoadingStatus({
            hasError: true,
            error: error,
            isLoaded: true
          });
        });
    }
    fetchPhotoLibraryIndex();
  }, [photoLibraryEndpoint]);

  let getMainView = () => {
    if (photoLibraryIndexLoadingStatus.hasError) {
      console.log(photoLibraryIndexLoadingStatus.error);
      return (
        <div>
          Error while loading the photo library index. Please try again later.
          See console for more details.
        </div>
      );
    } else if (
      photoLibraryIndexLoadingStatus.isLoaded &&
      photoLibraryIndex.allPhotos.length > 0
    ) {
      return (
        <>
          <Switch>
            <Route path="/photos/:photoId">
              <Photos
                photoList={photoLibraryIndex.allPhotos}
                photoLibraryEndpoint={photoLibraryEndpoint}
              />
            </Route>
            <Route exact path="/albums/:albumId">
              <Album
                albumList={photoLibraryIndex.albums}
                photoLibraryEndpoint={photoLibraryEndpoint}
              />
            </Route>
            <Route exact path="/albums/:albumId/:photoId">
              <Album
                albumList={photoLibraryIndex.albums}
                photoLibraryEndpoint={photoLibraryEndpoint}
              />
            </Route>
            <Route path="/albums">
              <Albums
                albumList={photoLibraryIndex.albums}
                photoLibraryEndpoint={photoLibraryEndpoint}
              />
            </Route>
            <Route path="/about">
              <About
                models={photoLibraryIndex.models}
                photoLibraryEndpoint={photoLibraryEndpoint}
              />
            </Route>
            <Route path="/">
              <Photos
                photoList={photoLibraryIndex.allPhotos}
                photoLibraryEndpoint={photoLibraryEndpoint}
              />
            </Route>
          </Switch>
        </>
      );
    } else {
      return <LoadingIndicator />;
    }
  };

  return (
    <div className="flowtos">
      <Router>
        <div className="container">
          <header className="Flowtos-header mt-5 mb-4">
            <span className="text-muted">Romain J. Giovanetti</span>
            <h1 className="mt-2">Jeu de Lumières</h1>
            <Menu displayAlbums={photoLibraryIndex.albums.length > 0} />
          </header>
          <main>{getMainView()}</main>
          <footer className="footer">
            <div className="container">
              <span className="small text-muted">
                All images © 2002-2020{" "}
                <a href="https://www.giovanetti.fr/">Romain J. Giovanetti</a>{" "}
                (@Gioroju) -{" "}
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://github.com/ganoninc/flowtos"
                >
                  Fork me on GitHub.
                </a>{" "}
              </span>
            </div>
          </footer>
        </div>
      </Router>
    </div>
  );
}

export default Flowtos;
