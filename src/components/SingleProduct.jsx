import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
function SingleProduct({ auth, setCountProduct }) {
  const { id } = useParams();
  const [product, setProduct] = useState({
    title: "Loading...",
    rating: { rate: 0, count: 0 },
    description: "Loading...",
    price: "Loading...",
    image: "",
  });

  useEffect(() => {
    const handleSingleProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);

        const result = await response.json();
        setProduct(result);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setProduct(false);
      }
    };
    handleSingleProduct();
  }, [id]);

  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  //add the product to the cart
  const username = localStorage.getItem("username");
  const handleSingleAddCart = (id) => {
    setCart((prevItems) => {
      const productFound = prevItems.find((product) => {
        return (
          product.id === id &&
          (product.username === username || product.username === "Guest")
        );
      });

      if (productFound) {
        return prevItems.map((cart) =>
          cart.id === id ? { ...cart, count: cart.count + 1 } : cart
        );
      } else {
        return [...prevItems, { id: id, count: 1, username: username }];
      }
    });
    setCountProduct(cart.length);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  //update the icon cart

  useEffect(() => {
    const updateItemCount = cart.reduce((accumulator, item) => {
      if (item.username === username || item.username === "Guest") {
        return accumulator + item.count;
      }
      return accumulator;
    }, 0);

    setCountProduct(updateItemCount);
  }, [cart, setCountProduct, username]);

  //loader
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <>
          {product ? (
            <Box className="conatinerSingleProduct">
              <Card className="singleCardProduct">
                <Box className="imagenSingleProduct">
                  <CardMedia
                    component="img"
                    image={product.image}
                    className="imagenSingle"
                  ></CardMedia>
                </Box>
                <Box
                  sx={{ display: "flex", flexDirection: "column" }}
                  className="singleProductInfo"
                >
                  <Typography
                    component="div"
                    variant="p"
                    className="categorySingleProduct"
                  >
                    {product.category}
                  </Typography>
                  <Typography
                    variant="h5"
                    component="div"
                    className="titleSingleProductCart"
                  >
                    {product.title}
                  </Typography>
                  <Typography variant="body2" component="div">
                    <div className="ratingProduct">
                      {product.rating && (
                        <>
                          <Rating
                            name="read-only"
                            value={product.rating.rate}
                            precision={0.5}
                            size="small"
                            readOnly
                          />
                          <span className="blue-style">
                            ({product.rating.count})
                          </span>
                        </>
                      )}
                    </div>
                  </Typography>
                  <hr width="100%" />
                  <Typography
                    variant="h6"
                    component="div"
                    className="priceSingleProduct"
                  >
                    ${product.price}
                  </Typography>
                  <hr width="100%" />
                  <Typography
                    component="div"
                    sx={{
                      fontFamily: "UbuntuNerdFont-bold",
                      fontSize: "1.1rem",
                    }}
                  >
                    About this item
                  </Typography>
                  <Typography component="div">{product.description}</Typography>
                  {product.title !== "Loading..." ? (
                    // auth === true ? (
                    <Link
                      onClick={() => handleSingleAddCart(product.id)}
                      className="button buttonAddCart"
                    >
                      <ShoppingCartOutlinedIcon sx={{ fontSize: "1.3rem" }} />
                      Add to cart
                    </Link>
                  ) : // ) : null
                  null}
                </Box>
              </Card>
            </Box>
          ) : (
            <Box className="errorContainerSingleProduct">
              <Typography component="div" variant="p" id="sorry">
                SORRY
              </Typography>
              <Typography component="div" variant="p" id="productnotfound">
                we could&apos;n find that product
              </Typography>
              <Typography component="div" variant="p" id="trysearching">
                try searching or go to{" "}
                <Link to="/" id="homePageError">
                  FredZone&apos;s home page
                </Link>
              </Typography>
            </Box>
          )}
        </>
      )}
    </>
  );
}

export default SingleProduct;
