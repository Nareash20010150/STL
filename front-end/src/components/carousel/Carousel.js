import React from "react";

import { CCarousel, CCarouselItem, CImage } from "@coreui/react";

function Carousel(props) {
    return (
        <CCarousel controls indicators>
            {props.images.map((item) => (
                <CCarouselItem key={item.id}>
                    <CImage
                        className="d-block w-100"
                        src={item.img}
                        alt={item.id}
                        height={600}
                    />
                </CCarouselItem>
            ))}
        </CCarousel>
    );
}

export default Carousel;
