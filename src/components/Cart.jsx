import react from "react";
import { useState, useEffect } from "react";
import { createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
function Cart({ setCountProduct }) {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const username = localStorage.getItem("username");
  const [cartProducts, setCartProducts] = useState([]);
  const [taxes, setTaxes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const handleSingleProduct = async () => {
      const productDetailFetch = cart
        .filter(
          (item) => item.username === username || item.username === "Guest"
        )
        .map(async (item) => {
          if (item) {
            const response = await fetch(
              `https://fakestoreapi.com/products/${item.id}`
            );
            const result = await response.json();
            result.count = item.count;
            result.username = username;
            setIsLoading(false);
            return result;
          } else {
            return null; // Return a placeholder value for items without 'id'
          }
        });

      const productDetail = await Promise.all(productDetailFetch);
      setCartProducts(productDetail);
    };
    handleSingleProduct();
  }, [cart, username]);
  const [empty, setEmpty] = useState("");

  useEffect(() => {
    if (cartProducts) {
      setEmpty("Your cart is empty");
      setIsLoading(false);
    }
  }, [cartProducts]);

  const handleChange = (event, productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId &&
      (item.username === username || item.username === "Guest")
        ? { ...item, count: event.target.value }
        : item
    );
    setCart(updatedCart);
  };

  const handleDelete = (productId) => {
    const updateCart = cart.filter(
      (item) =>
        !(
          item.id === productId &&
          (item.username === username || item.username === "Guest")
        )
    );
    setCart(updateCart);
  };

  //update guest to username
  useEffect(() => {
    if (username !== "Guest") {
      const updateGuest = cart.map((guest) =>
        guest.username === "Guest" ? { ...guest, username: username } : guest
      );
      setCart(updateGuest);
    }
  }, [username]);

  //update the icon cart
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const updateItemCount = cart.reduce((accumulator, item) => {
      if (item.username === username || item.username === "Guest") {
        return accumulator + item.count;
      }
      return accumulator;
    }, 0);

    setTotal(updateItemCount);
    setCountProduct(updateItemCount);
  }, [cart, setCountProduct, username]);

  //get the grand total
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const updateItemPrice = cartProducts
      .filter((item) => item.username === username || item.username === "Guest")
      .map((item) => item.price * item.count);

    const updateTotalPrice = updateItemPrice.reduce(
      (prev, next) => prev + next,
      0
    );

    setTotalPrice(updateTotalPrice);
    const calculatedTaxes = (updateTotalPrice * 0.06).toFixed(2);
    setTaxes(calculatedTaxes);
  }, [cartProducts, totalPrice, username]);

  return (
    <div className="containerPage" style={{ minHeight: "78.2vh" }}>
      {isLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <>
          <Box className="cartContainer">
            <h1 className="shoppingCart">Shopping Cart</h1>
            {cartProducts.length == 0 ? <>{empty}</> : null}
            <Box className="cartContainerColumn">
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Box className="containerCartList">
                  {cartProducts
                    .filter((product) => product.username == username)
                    .map((product) => (
                      <Grid
                        item
                        xs={12}
                        md={12}
                        lg={12}
                        key={product.id}
                        className="sizeContainerCard"
                      >
                        <Card className="cardProduct">
                          <Box className="imagenSingleProduct">
                            <CardMedia
                              component="img"
                              image={product.image}
                              className="imagenCart"
                            ></CardMedia>
                          </Box>
                          <Box
                            sx={{ display: "flex", flexDirection: "column" }}
                            className="cartProductInfo"
                          >
                            <Typography
                              component="div"
                              variant="p"
                              className="categorySingleProduct"
                            >
                              {product.category}
                            </Typography>
                            <Link
                              to={`/product/${product.id}`}
                              className="linkCartProduct"
                            >
                              <Typography
                                variant="p"
                                component="div"
                                className="titleSingleProduct"
                              >
                                {product.title}
                              </Typography>
                            </Link>
                            <Typography
                              variant="p"
                              component="div"
                              className="cartSingleProduct"
                            >
                              ${product.price}
                            </Typography>
                            <Typography
                              variant="p"
                              component="div"
                              className="priceSingleProduct"
                            >
                              <FormControl
                                variant="standard"
                                sx={{ m: 1, minWidth: 120 }}
                              >
                                <InputLabel id="demo-simple-select-standard-label">
                                  Quantity
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-standard-label"
                                  id="demo-simple-select-standard"
                                  value={product.count}
                                  onChange={(event) =>
                                    handleChange(event, product.id)
                                  }
                                  label="Quantity"
                                >
                                  {Array.from(
                                    {
                                      length:
                                        product.count < 10
                                          ? 10
                                          : product.count + 3,
                                    },
                                    (_, index) => (
                                      <MenuItem
                                        key={index + 1}
                                        value={index + 1}
                                      >
                                        {index + 1}
                                      </MenuItem>
                                    )
                                  )}
                                </Select>
                              </FormControl>
                            </Typography>
                            <Tooltip title="Delete" placement="right">
                              <IconButton
                                sx={{ width: "40px", height: "40px" }}
                                onClick={() => handleDelete(product.id)}
                              >
                                <DeleteOutlineIcon className="deleteProduct" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Card>
                      </Grid>
                    ))}
                </Box>
              </Grid>
              {cartProducts.length !== 0 ? (
                <Box className="subtotal">
                  <Grid container className="containerSubtotalCart">
                    <Grid
                      item
                      xs={12}
                      md={12}
                      lg={12}
                      className="containerSubtotalCart"
                    >
                      <Typography
                        variant="p"
                        component="div"
                        sx={{
                          fontFamily: "UbuntuNerdFont-bold",
                          fontSize: "1.4rem",
                        }}
                      >
                        Summary
                      </Typography>
                      <div className="cartSubtotal">
                        <Typography
                          variant="p"
                          component="div"
                          className="totalInfo"
                        >
                          Subtotal ({total} {total > 1 ? "Items" : "Item"}) :
                        </Typography>
                        <Typography
                          variant="p"
                          component="div"
                          className="amount"
                        >
                          ${totalPrice.toFixed(2)}
                        </Typography>
                      </div>
                      <div className="cartSubtotal">
                        <Typography
                          variant="p"
                          component="div"
                          className="totalInfo"
                        >
                          Estimated Shipping & Handling
                        </Typography>
                        <Typography
                          variant="p"
                          component="div"
                          className="amount"
                        >
                          $7.00
                        </Typography>
                      </div>
                      <div className="cartSubtotal">
                        <Typography
                          variant="p"
                          component="div"
                          className="totalInfo"
                        >
                          Estimated Tax{" "}
                        </Typography>
                        <Typography
                          variant="p"
                          component="div"
                          className="amount"
                        >
                          ${taxes}
                        </Typography>
                      </div>

                      <hr />
                      <div className="cartSubtotal">
                        <Typography
                          variant="p"
                          component="div"
                          className="totalInfo"
                        >
                          Total:
                        </Typography>
                        <Typography
                          variant="p"
                          component="div"
                          className="amount"
                          sx={{
                            fontFamily: "UbuntuNerdFont-bold",
                            marginBottom: "5px",
                          }}
                        >
                          $
                          {(parseFloat(totalPrice) + parseFloat(taxes)).toFixed(
                            2
                          )}
                        </Typography>
                      </div>
                      <hr />
                      <Link
                        onClick={() => handleSingleAddCart(product.id)}
                        className="button buttonAddCart checkoutCart"
                      >
                        Checkout
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              ) : null}
            </Box>
          </Box>
        </>
      )}
    </div>
  );
}

export default Cart;
