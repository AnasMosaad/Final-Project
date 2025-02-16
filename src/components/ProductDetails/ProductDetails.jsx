import React, { useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  let { id, category } = useParams();

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  function getProduct(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  function getAllProduct() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        let related = res.data.data.filter(
          (product) => product.category.name == category
        );
        setRelatedProducts(related);
      })
      .catch((res) => {});
  }

  useEffect(() => {
    getProduct(id);
    getAllProduct();
  }, [id, category]);

  return (
    <>
      <div className="row items-center">
        <div className="w-1/4">
          <Slider {...settings}>
            {product?.images.map((src) => (
              <img key={id} src={src} className="w-full"></img>
            ))}
          </Slider>
        </div>
        <div className="w-3/4 p-3">
          <h3 className="capitalize font-semibold text-2xl">
            {product?.title}
          </h3>
          <h4 className="text-gray-500 my-3">{product?.description}</h4>
          <h4 className="">{product?.category.name}</h4>
          <div className="flex justify-between p-3 my-2">
            <span>{product?.price}EGP</span>
            <span>
              {" "}
              <i className="fas fa-star text-yellow-400"></i>
              {product?.ratingsAverage}
            </span>
          </div>
          <button className="btn ">Add To Cart</button>
        </div>
      </div>

      <div className="row">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((product) => (
            <div key={product.id} className="w-1/6">
              <div className="product p-2 my-2">
                <Link
                  to={`/productdetails/${product.id}/${product.category.name}`}
                >
                  <img src={product.imageCover} alt="" />
                  <h3 className="mb-3 text-emerald-500">
                    {product.category.name}
                  </h3>
                  <h3 className="font-semibold mb-1">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="flex justify-between p-3">
                    <span>{product.price}EGP</span>
                    <span>
                      {" "}
                      <i className="fas fa-star text-yellow-400"></i>
                      {product.ratingsAverage}
                    </span>
                  </div>
                </Link>
                <button className="btn ">Add To Cart</button>
              </div>
            </div>
          ))
        ) : (
          <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div>
        )}
      </div>
    </>
  );
}
