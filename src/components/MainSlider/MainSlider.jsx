import React from "react";
import style from "./MainSlider.module.css";
import slid1 from "../../assets/images/slider-image-1.jpeg";
import slid2 from "../../assets/images/slider-image-2.jpeg";
import slid3 from "../../assets/images/slider-image-3.jpeg";
import slid4 from "../../assets/images/grocery-banner-2.jpeg";
import slid5 from "../../assets/images/grocery-banner.png";
import Slider from "react-slick";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1 ,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="row">
        <div className="w-3/4">
          <Slider {...settings}>
            <img src={slid1} className="w-full h-[400px]" alt="" />
            <img src={slid4} className="w-full h-[400px]" alt="" />
            <img src={slid5} className="w-full h-[400px]" alt="" />
          </Slider>
        </div>
        <div className="w-1/4">
          <img src={slid2} className="w-full h-[200px]" alt="" />
          <img src={slid3} className="w-full h-[200px]" alt="" />
        </div>
      </div>
    </>
  );
}
