import React from "react";
import { CSSTransition } from "react-transition-group";
import Model from "./Model";

import "./About.scss";

function About(props) {
  const { models, photoLibraryEndpoint } = props;
  let getModels = () => {
    if (models && Array.isArray(models) && models.length > 0) {
      return (
        <div className="models mt-4">
          <h2 className="mb-4">Models</h2>
          <p>Special thanks to these amazing models</p>
          <div className="d-flex justify-content-center flex-wrap models-list">
            {models.map(model => {
              return (
                <Model
                  key={model.id}
                  fullname={model.fullname}
                  formatedFullName={model.formatedFullName}
                  picture={photoLibraryEndpoint + model.thumbnailUrl}
                  picture2x={photoLibraryEndpoint + model.thumbnail2xUrl}
                  instagramUsername={model.instagram}
                />
              );
            })}
          </div>
        </div>
      );
    }
  };

  return (
    <CSSTransition in={true} timeout={25} classNames="fade" appear>
      <div className="about">
        <div className="about-me">
          <div className="profile-picture">
            <img
              src={process.env.PUBLIC_URL + "/me.jpg"}
              srcSet={
                process.env.PUBLIC_URL +
                "/me.jpg 1x, " +
                process.env.PUBLIC_URL +
                "/me_2x.jpg 2x"
              }
              sizes="150px"
              alt="me"
              className="img-thumbnail mb-4"
              width="150"
              height="150"
            />
          </div>
          <div className="presentation">
            <p>As far as I remember, I've always loved taking photos.</p>
            <p>
              I started my journey with the camera of my father, an old one with
              a limited photographic film, with which each photo was precious.
              Then, I won a compact digital camera when I was 12 years old that
              eventually died when I was 17. A few years after the iPhone
              arrived in my life and changed everything because I was now able
              to carry a camera all the time, right in my pocket, always ready
              to shoot the sometimes unpredictable. Eventually, in December 19',
              I bought a second hand professional digital camera to go beyond
              the limitations of my smartphone and just two minutes after that,
              as I was happily crossing the road to reach my car, all excited by
              this promising new toy, I got hit by a car, but that's another
              story.
            </p>
            <p>
              Long story short, I've enjoyed taking and editing those photos and
              I hope you'll like them as well.
            </p>
          </div>
        </div>
        {getModels()}
      </div>
    </CSSTransition>
  );
}

export default About;
