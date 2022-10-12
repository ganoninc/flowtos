import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";
import Menu from "./Menu";
import GATracker from "./GATracker";
import Photos from "./photos/Photos";
import Albums from "./albums/Albums";
import Album from "./albums/Album";
import About from "./about/About";
import SSRRedirect from "./SSRRedirect";

import "./Flowtos.scss";

function Flowtos(props) {
  const { photoLibraryEndpoint } = props;

  const [photoLibraryIndexLoadingStatus, setPhotoLibraryIndexLoadingStatus] =
    useState({
      hasError: false,
      error: null,
      isLoaded: false,
    });

  const [photoLibraryIndex, setPhotoLibraryIndex] = useState({
    allPhotos: [],
    albums: [],
    models: [],
  });

  useEffect(() => {
    async function fetchPhotoLibraryIndex() {
      const res = await fetch(photoLibraryEndpoint + "index.json");
      res
        .json()
        .then((photoLibraryIndex) => {
          setPhotoLibraryIndex({
            allPhotos: photoLibraryIndex.allPhotos,
            sharedPhotosData: photoLibraryIndex.sharedPhotosData,
            albums: photoLibraryIndex.albums,
            models: photoLibraryIndex.credits.models,
          });

          setPhotoLibraryIndexLoadingStatus({
            hasError: false,
            error: null,
            isLoaded: true,
          });
        })
        .catch((error) => {
          setPhotoLibraryIndexLoadingStatus({
            hasError: true,
            error: error,
            isLoaded: true,
          });
        });
    }
    fetchPhotoLibraryIndex();
  }, [photoLibraryEndpoint]);

  let getMainView = () => {
    if (photoLibraryIndexLoadingStatus.hasError) {
      console.log(photoLibraryIndexLoadingStatus.error);
      return (
        <div className="mb-4">
          <p>
            Error while loading the photo library index. Please try again later.
          </p>
        </div>
      );
    } else if (
      photoLibraryIndexLoadingStatus.isLoaded &&
      photoLibraryIndex.allPhotos.length > 0
    ) {
      return (
        <>
          <Routes>
            <Route
              path="/photos/:photoId"
              element={
                <GATracker>
                  <Photos
                    photoList={photoLibraryIndex.allPhotos}
                    sharedPhotosData={photoLibraryIndex.sharedPhotosData}
                    photoLibraryEndpoint={photoLibraryEndpoint}
                  />
                </GATracker>
              }
            />
            <Route
              path="/albums/:albumId"
              element={
                <GATracker>
                  <Album
                    albumList={photoLibraryIndex.albums}
                    sharedPhotosData={photoLibraryIndex.sharedPhotosData}
                    photoLibraryEndpoint={photoLibraryEndpoint}
                  />
                </GATracker>
              }
            />
            <Route
              path="/albums/:albumId/:photoId"
              element={
                <GATracker>
                  <Album
                    albumList={photoLibraryIndex.albums}
                    sharedPhotosData={photoLibraryIndex.sharedPhotosData}
                    photoLibraryEndpoint={photoLibraryEndpoint}
                  />
                </GATracker>
              }
            />
            <Route
              path="/albums"
              element={
                <GATracker>
                  <Albums
                    albumList={photoLibraryIndex.albums}
                    sharedPhotosData={photoLibraryIndex.sharedPhotosData}
                    photoLibraryEndpoint={photoLibraryEndpoint}
                  />
                </GATracker>
              }
            />
            <Route
              path="/about"
              element={
                <GATracker>
                  <About
                    models={photoLibraryIndex.models}
                    sharedPhotosData={photoLibraryIndex.sharedPhotosData}
                    photoLibraryEndpoint={photoLibraryEndpoint}
                  />
                </GATracker>
              }
            />
            <Route
              path="/ssr/photos/:photoId"
              element={
                <GATracker>
                  <SSRRedirect />
                </GATracker>
              }
            />
            <Route
              path="/ssr/albums/:albumId"
              element={
                <GATracker>
                  <SSRRedirect />
                </GATracker>
              }
            />
            <Route
              path="/ssr/albums/:albumId/:photoId"
              element={
                <GATracker>
                  <SSRRedirect />
                </GATracker>
              }
            />
            <Route
              path="/ssr/albums"
              element={
                <GATracker>
                  <SSRRedirect />
                </GATracker>
              }
            />
            <Route
              path="/ssr/about"
              element={
                <GATracker>
                  <SSRRedirect />
                </GATracker>
              }
            />
            <Route
              path="/ssr"
              element={
                <GATracker>
                  <SSRRedirect />
                </GATracker>
              }
            />
            <Route
              path="/"
              element={
                <GATracker>
                  <Photos
                    photoList={photoLibraryIndex.allPhotos}
                    sharedPhotosData={photoLibraryIndex.sharedPhotosData}
                    photoLibraryEndpoint={photoLibraryEndpoint}
                  />
                </GATracker>
              }
            />
          </Routes>
        </>
      );
    } else {
      return <LoadingIndicator />;
    }
  };

  return (
    <div className="flowtos">
      <Router basename="/flowtos">
        <div className="container">
          <header className="Flowtos-header pt-5 mb-4">
            <span className="text-muted">Romain J. Giovanetti</span>
            <h1 className="mt-2">Jeu de Lumières</h1>
            <Menu displayAlbums={photoLibraryIndex.albums.length > 0} />
          </header>
          <main>{getMainView()}</main>
          <footer className="pb-5 footer">
            <div className="container">
              <span className="small text-muted">
                All images © 2002-2022{" "}
                <a href="https://www.giovanetti.fr/">Romain J. Giovanetti</a>
                <br />
                Flowtos by{" "}
                <a href="https://www.giovanetti.fr/">
                  Romain J. Giovanetti
                </a>,{" "}
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://github.com/ganoninc/flowtos"
                >
                  fork it on GitHub.
                </a>
              </span>
            </div>
          </footer>
        </div>
      </Router>
    </div>
  );
}

export default Flowtos;
