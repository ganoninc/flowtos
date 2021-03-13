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
            {models.map((model) => {
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
              I started my journey with my father's camera. It was one of those
              old cameras from the nineties that needed a photographic film to
              work. The number of shots was limited, so each pressure on the
              shutter release button was costly. As a carefree little boy, I
              didn't get many occasions to have this camera between my hands.
              However, I can still remember how special these moments were.
            </p>
            <p>
              A few years later, when I was a teenager, I was lucky enough to
              win a compact digital camera. This device brought me freedom. With
              that in my hands, I was eventually able to decide the subject of
              my pictures and experiment without worrying about costs. On top of
              that, I was already a computer enthusiast too, so it was natural
              for me to embrace digital photography.
            </p>
            <p>
              In 2009, I'd saved enough money during one year to buy a
              second-hand iPhone Edge. This phone had a low-quality camera and
              couldn't record videos, but I was more than happy to get it as my
              precious compact digital camera had died two years earlier. Above
              all, it changed my relation to photography as it made me carry a
              camera all the time, right in my pocket, always ready to shoot,
              even the unpredictable.
            </p>
            <p>
              Many smartphones succeeded this iPhone (LG Optimus 7, iPhone 4S,
              iPhone 6, and iPhone 6S). And as I started posting pictures on
              Instagram, I got more and more people telling me some of my photos
              were definitively interesting. So I thought: «why wouldn't I step
              up in this photography game and get a little bit more
              professional?».
            </p>
            <p>
              Determined to improve my skills and excited by this whole new
              world to explore, I bought a second-hand DSLR camera on December
              19', which is today my primary camera. It's a heavy Nikon D7000
              (APS-C) with a couple of versatile lenses (35mm F1.8, 50mm F1.8,
              17-70mm F2.8-4, and 75-300mm F4.5-5.6). I've spent countless hours
              learning how to use my gear and edit RAW images in Adobe
              Lightroom, and this is not over yet (and will never be). However,
              I'm proud of what I'm already able to create and present to you
              today on that website.{" "}
            </p>
            <p>
              I hope you'll enjoy browsing this photo gallery as much as I loved
              working on these pictures. Last but not least, I want to thank all
              the people who believed in me, especially my friend Sneha Sharma.
            </p>
          </div>
        </div>
        {getModels()}
      </div>
    </CSSTransition>
  );
}

export default About;
