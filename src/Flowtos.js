import React from 'react';
import './Flowtos.css';
import LoadingIndicator from './LoadingIndicator'
import Photos from './Photos';

class Flowtos extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isPhotosListLoaded: false,
      photosList: []
    };
  }

  componentDidMount() {
    fetch("./photos/list.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isPhotosListLoaded: true,
            photosList: result.items
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

  render () {
    let photosView;
    const { error, isPhotosListLoaded, photosList } = this.state;

    if (error) {
      photosView = <div>Error while loading Flowtos: {error.message}</div>;
    }
    else if (isPhotosListLoaded) {
      photosView = <Photos list={photosList}></Photos>;
    } else {
      photosView = <LoadingIndicator></LoadingIndicator>;
    }

    return (<div className="Flowtos">
      <header className="Flowtos-header">
        <h1>Flowtos</h1>
      </header>
      <main>{photosView}</main>
    </div>);
  }
}

export default Flowtos;