import React from "react";

import Carousel from "../../components/carousel/Carousel";

import img1 from "../../assets/images/home_1.jpeg";
import img2 from "../../assets/images/home_2.jpeg";
import img3 from "../../assets/images/home_3.jpeg";
import img4 from "../../assets/images/home_4.jpeg";

const data = [
    {
        id: 1,
        name: "IMG1",
        img: img1,
    },
    {
        id: 2,
        name: "IMG2",
        img: img2,
    },
    {
        id: 3,
        name: "IMG3",
        img: img3,
    },
    {
        id: 4,
        name: "IMG4",
        img: img4,
    },
];

function Home() {
    return (
        <div>
            <h1 class="display-6" style={{fontWeight:'bold'}}>Sri-Care Mobile Communication Services</h1>
            <br />
            <Carousel images={data} />
        </div>
    );
}

export default Home;
