import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  let headers = { token: localStorage.getItem(`userToken`) };
  const [cartId, setCartId] = useState(0);
  const [numOfC, setnumOfC] = useState(0);

  function addProductToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: productId,
        },
        {
          headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function getLoggedUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((res) => {
        setCartId(res.data.data._id);
        setnumOfC(res.data.numOfCartItems);

        return res;
      })
      .catch((err) => err);
  }
  function updateCartQnt(productId, newCount) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: newCount },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function deleteCartItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  function checkout(cartId, url, formData) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        { shippingAddress: formData },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  useEffect(() => {
    getLoggedUserCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getLoggedUserCart,
        updateCartQnt,
        deleteCartItem,
        checkout,
        cartId,
        setnumOfC,
        numOfC,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
