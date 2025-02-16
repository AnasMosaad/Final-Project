import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
  };

  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((res) => {});
  }
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <h2 className="my-3 font-semibold text-gray-600">
        Shop Popular Categories
      </h2>
        <div className="row">
        {categories.map((category) => (
          <div key={category._id} className="md:w-1/2 lg:w-1/3">
            <img src={category.image} className="w-full h-[400px] " alt="" />
            <h4>{category.name}</h4>
          </div>
        ))}
        </div>
    </>
  );
}
