import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { Model } from './Model'
import type { Model as ModelType } from '../types'

import './About.scss'

type AboutProps = {
    models: ModelType[]
    photoLibraryEndpoint: string
}

export const About = (props: AboutProps): React.JSX.Element => {
    const { models, photoLibraryEndpoint } = props

    const Models = (): React.JSX.Element => {
        return (
            <div className='models mt-4'>
                <h2 className='mb-4'>Models</h2>
                <p>Special thanks to these amazing models</p>
                <div className='d-flex justify-content-center flex-wrap models-list'>
                    {models.map((model) => {
                        return (
                            <Model
                                key={model.id}
                                fullname={model.fullname}
                                thumbnailUrl={photoLibraryEndpoint + model.thumbnailUrl}
                                thumbnail2xUrl={photoLibraryEndpoint + model.thumbnail2xUrl}
                                instagram={model.instagram}
                            />
                        )
                    })}
                </div>
            </div>
        )
    }

    return (
        <CSSTransition in={true} timeout={25} classNames='fade' appear>
            <div className='about'>
                <div className='about-me'>
                    <div className='profile-picture'>
                        <img
                            src={process.env.PUBLIC_URL + '/me.jpg'}
                            srcSet={
                                process.env.PUBLIC_URL +
                                '/me.jpg 1x, ' +
                                process.env.PUBLIC_URL +
                                '/me_2x.jpg 2x'
                            }
                            sizes='150px'
                            alt='me'
                            className='img-thumbnail mb-4'
                            width='150'
                            height='150'
                        />
                    </div>
                    <div className='presentation'>
                        <div>
                            <p>
                                Photography has always been a passion of mine, for as long as I can
                                remember.
                            </p>
                            <p>
                                My journey began with my father’s old film camera from the 90s—one
                                of those that required photographic film, where every shot counted.
                                As a carefree little boy, I didn’t get to use it often, but each
                                opportunity felt incredibly special and left a lasting impression.
                            </p>
                            <p>
                                A few years later, as a teenager, I was lucky enough to win a
                                compact digital camera, a beautiful Olympus µ-mini Digital S. That
                                little device gave me the freedom to explore photography on my own
                                terms. No more limits, no more cost per shot—I could experiment
                                endlessly. Already a budding computer enthusiast, I naturally
                                gravitated toward digital photography.
                            </p>
                            <p>
                                In 2009, after saving for a year, I bought a second-hand iPhone
                                Edge. Despite its poor camera quality and lack of video capability,
                                I was thrilled. My trusty compact camera had died two years earlier,
                                and this phone brought photography back into my daily life. For the
                                first time, I had a camera with me at all times—ready to capture
                                even the most spontaneous moments.
                            </p>
                            <p>
                                Many smartphones followed—the LG Optimus 7, iPhone 4S, iPhone 6, and
                                iPhone 6S. As I began sharing my photos on Instagram, I received
                                more and more encouragement from others. People told me my shots
                                stood out. That’s when I thought, “Why not take this further and
                                push myself to the next level?”
                            </p>
                            <p>
                                Eager to grow and dive deeper into the world of photography, I
                                purchased a second-hand DSLR on December 19. It’s now my main
                                camera: a solid Nikon D7000 (APS-C) paired with a few versatile
                                lenses (35mm f/1.8, 50mm f/1.8, 17–70mm f/2.8–4, and 75–300mm
                                f/4.5–5.6). I've spent countless hours learning to master my gear
                                and edit RAW images in Adobe Lightroom—and the learning never stops.
                                Still, I’m proud of what I’ve achieved and excited to share it with
                                you here.
                            </p>
                            <p>
                                I hope you enjoy exploring this photo gallery as much as I’ve
                                enjoyed creating it. And finally, a heartfelt thank you to everyone
                                who believed in me—especially my friend Sneha Sharma.
                            </p>
                        </div>
                    </div>
                </div>
                {models.length > 0 && <Models />}
            </div>
        </CSSTransition>
    )
}
