import React, { useState } from 'react';
import { Image, Modal } from "semantic-ui-react";
import { map } from "lodash";
import { Carousel } from 'react-responsive-carousel';

const settings = {
    className: "carousel-screenshots",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    swipeToSlider: false,
    arrows: true
};

export default function CarouselScreenshots(props) {
    const { title, screenshots } = props;
    const [showModal, setShowModal] = useState(false);
    const [urlImage, setUrlImage] = useState(null);

    const openImage = (url) => {
        setUrlImage(url);
        setShowModal(true);
    }

    return (
        <>
            {/*
            <Slider {...settings}>
                {map(screenshots, (screenshot) => (
                    <Image
                        key={screenshot.id}
                        src={screenshot.url}
                        alt={screenshot.name}
                        onClick={() => openImage(screenshot.url)}
                    />
                ))}
            </Slider>
                */}
            <div className="carousel-box">
                <Carousel itemWidth="50px"  autoPlay>

                    {map(screenshots, (screenshot) => (
                        <div className="carousel-box__image">
                            <Image size="big" alt="" src={screenshot.url} />
                        </div>
                    ))}

                </Carousel>
            </div>
            <Modal open={showModal} onClose={() => setShowModal(false)} size="large">
                <Image src={urlImage} alt={title} />
            </Modal>
        </>
    )
}
