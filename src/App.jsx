import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Products from "./components/Products";
import Register from "./components/Register";
import "./App.css";
import SingleProduct from "./components/SingleProduct";
function App() {
  const Navigate = useNavigate();
  const [token, setToken] = useState("");
  const [auth, setAuth] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [countProduct, setCountProduct] = useState(0);

  let username = "";
  if (localStorage.getItem("username") === null) {
    username = localStorage.setItem("username", "Guest");
  } else {
    username = localStorage.getItem("username");
  }

  if (token) {
    localStorage.setItem("token", token);
  }

  //updating the count of the icon cart
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  //update the icon cart

  useEffect(() => {
    const updateItemCount = cart.reduce((accumulator, item) => {
      if (item.username === username) {
        return accumulator + item.count;
      }
      return accumulator;
    }, 0);

    setTotal(updateItemCount);
    setCountProduct(updateItemCount);
  }, [cart, setCountProduct, username]);

  //authentication
  useEffect(() => {
    if (
      localStorage.getItem("token") !== "" &&
      localStorage.getItem("token") !== null
    ) {
      let TokenItem = localStorage.getItem("token");
      setToken(TokenItem);
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [setToken, token]);

  return (
    <>
      <Navbar
        auth={auth}
        countProduct={countProduct}
        setSearchInput={setSearchInput}
      />
      <Routes>
        <Route
          path="/"
          element={<Products searchInput={searchInput} />}
        ></Route>
        <Route path="/login" element={<Login setToken={setToken} />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/cart"
          element={<Cart setCountProduct={setCountProduct} />}
        ></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route
          path="/logout"
          element={
            <Logout
              setToken={setToken}
              setAuth={setAuth}
              setCountProduct={setCountProduct}
            />
          }
        ></Route>
        <Route
          path="/:category?"
          element={<Products searchInput={searchInput} />}
        ></Route>
        <Route
          path="/product/:id"
          element={
            <SingleProduct auth={auth} setCountProduct={setCountProduct} />
          }
        ></Route>
        <Route
          path="*"
          element={<Navigate to="/" />} // Redirect to the home page
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
