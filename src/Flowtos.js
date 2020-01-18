import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";
import Photos from "./Photos";
import Albums from "./Albums";
import Album from "./Album";
import About from "./About";
import CategorySelector from "./CategorySelector";

import "./Flowtos.scss";

function Flowtos(props) {
  const { photoLibraryEndpoint } = props;
  console.log(photoLibraryEndpoint);

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

  let categorySelectors = (
    <>
      <Switch>
        <Route path="/photos/:photoId">
          <CategorySelector selected="latest-photos" />
        </Route>
        <Route path="/albums">
          <CategorySelector selected="albums" />
        </Route>
        <Route path="/about">
          <CategorySelector selected="about" />
        </Route>
        <Route path="/">
          <CategorySelector selected="latest-photos" />
        </Route>
      </Switch>
    </>
  );

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
            {categorySelectors}
          </header>
          <main>{getMainView()}</main>
          <footer className="footer mt-4">
            <div className="container">
              <span className="text-muted">
                All images © 2002-2020{" "}
                <a href="https://www.giovanetti.fr/">Romain J. Giovanetti</a>{" "}
                (@Gioroju).
              </span>
            </div>
          </footer>
        </div>
      </Router>
    </div>
  );
}

export default Flowtos;
