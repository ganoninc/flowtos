import React from 'react';
import './Flowtos.scss';
import LoadingIndicator from './LoadingIndicator'
import Photos from './Photos';

class Flowtos extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isPhotoLibraryIndexLoaded: false,
            photoLibraryIndex: []
        };
    }

    componentDidMount() {
        fetch("./photo-library-ressources/index.json")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isPhotoLibraryIndexLoaded: true,
                        photoLibraryIndex: result.all_photos
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        let photosView;
        const { error, isPhotoLibraryIndexLoaded, photoLibraryIndex } = this.state;

        if (error) {
            photosView = <div>Error while loading Flowtos: {error.message}</div>;
        }
        else if (isPhotoLibraryIndexLoaded) {
            photosView = <Photos list={photoLibraryIndex}></Photos>;
        } else {
            photosView = <LoadingIndicator></LoadingIndicator>;
        }

        return (
            <>
                <div className="container">
                    <div className="Flowtos">
                        <header className="Flowtos-header py-5">
                            <span className="text-muted">Romain Julien Giovanetti</span>
                            <h1 className="pt-2">Jeu de Lumières</h1>
                        </header>
                        <main>{photosView}</main>
                        <footer class="footer mt-auto py-2">
                            <div class="container">
                                <span class="text-muted">All images © 2002-2020 <a href="https://www.giovanetti.fr/">Romain Julien Giovanetti</a> (@Gioroju). </span>
                            </div>
                        </footer>
                    </div>
                </div>
            </>
        );
    }
}

export default Flowtos;