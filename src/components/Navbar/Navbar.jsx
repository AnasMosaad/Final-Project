import React, { useContext } from "react";
import style from "./Navbar.module.css";
import logo from "../../assets/images/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  let { userLogin, setuserLogin } = useContext(UserContext);
  let navigate =useNavigate()
  let {numOfC} = useContext(CartContext)

  function signOut() {
    localStorage.removeItem("userToken");
    setuserLogin(null);
    navigate("/login")
  }
  return (
    <>
      <nav className="bg-slate-300 fixed top-0 left-0 right-0 border-gray-200 ">
        <div className="flex flex-wrap justify-center lg:justify-between gap-3 items-center mx-auto max-w-screen-xl p-4">
          <div className="flex items-center gap-4">
            <Link
              to=""
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src={logo}
                width={"120px"}
                className="h-8"
                alt="Flowbite Logo"
              />
            </Link>
            {userLogin != null ? (
              <>
                <ul className="flex gap-3">
                  <li>
                    <Link className="text-slate-600" to="">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link className="text-slate-600 relative" to="cart">
                      Cart 
                      <div className="absolute top-[-15px] right-[-15px] size-5 bg-emerald-500 text-white rounded-full flex items-center justify-center">{numOfC}</div>
                    </Link>
                  </li>
                  <li>
                    <Link className="text-slate-600" to="products">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link className="text-slate-600" to="categories">
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link className="text-slate-600" to="brands">
                      Brands
                    </Link>
                  </li>
                </ul>
              </>
            ) : null}
          </div>

          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <ul className="flex gap-3">
              <li>
                <i className="fab fa-facebook"></i>
              </li>
              <li>
                <i className="fab fa-youtube"></i>
              </li>
              <li>
                <i className="fab fa-instagram"></i>
              </li>
              <li>
                <i className="fab fa-linkedin"></i>
              </li>
              <li>
                <i className="fab fa-twitter"></i>
              </li>
            </ul>
            <ul className="flex gap-4">
              {userLogin != null ? (
                <li>
                  <span onClick={signOut} className="cursor-pointer">SignOut</span>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="login">Login</Link>
                  </li>
                  <li>
                    <Link to="register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
