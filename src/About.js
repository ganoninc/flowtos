import React from "react";

import './About.scss';

function About(props) {
  return (
    <div className="about">
      {/* <h2 className="pb-3">Me</h2> */}
      <div className="about-me">
        <div className="profile-picture">
          <img src="./me_2x.jpg" alt="myself" className="rounded-circle mb-4" width="150" height="150" />
        </div>
        <div className="presentation">
          <p>As far as I remember, I've always loved taking photos.</p>
          <p>
            I started my
            journey with the camera of my father, an old one with a limited
            photographic film, with which each photo was precious. Then, I won a
            compact digital camera when I was 12 years old that eventually died when
            I was 17. A few years after the iPhone arrived in my life and changed
            everything because I was now able to carry a camera all the time, right
            in my pocket, always ready to shoot the sometimes unpredictable.
            Eventually, in December 19', I bought a professional digital camera to
            go beyond the limitations of my smartphone and just two minutes after the
            transaction, I got hit by a car as pedestrian, but that's another story.
          </p>
          <p>
            Long story short, I've enjoyed taking and editing those photos and I
            hope you'll like them.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;