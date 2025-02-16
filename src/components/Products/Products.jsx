import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Products from "./../Products/Products";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function RecentProducts() {
  const [Products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  let { addProductToCart, setnumOfC, numOfC } = useContext(CartContext);

  async function addToCart(id) {
    setCurrentId(id);
    setLoading(true);
    let response = await addProductToCart(id);
    console.log(response.data);
    if (response.data.status == "success") {
      toast.success(response.data.message);
      setLoading(false);
      setnumOfC(numOfC + 1);
    } else {
      toast.error(response.data.message);
      setLoading(false);
    }
  }

  function getProoducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((res) => {});
  }

  useEffect(() => {
    getProoducts();
  }, []);

  return (
    <>
      <div className="row">
        {Products.length > 0 ? (
          Products.map((product) => (
            <div key={product.id} className="md:w-1/3 lg:w-1/6">
              <div className="product p-2 my-2">
                <Link
                  to={`productdetails/${product.id}/${product.category.name}`}
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
                <button onClick={() => addToCart(product.id)} className="btn ">
                  {loading && currentId == product.id ? (
                    <i className="fa fa-spinner fa-spin"></i>
                  ) : (
                    "Add To Cart"
                  )}
                </button>
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
