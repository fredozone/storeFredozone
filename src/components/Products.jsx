import react from "react";
import { useEffect, useState, Fragment } from "react";
import Rating from "@mui/material/Rating";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Alert from "@mui/material/Alert";

// sort icon
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import TuneIcon from "@mui/icons-material/Tune";
function Products({ searchInput }) {
  const { category } = useParams();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const username = localStorage.getItem("username");
  const [originalItems, setOriginalItems] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);

      try {
        let encodedCategory = category;
        let categoryName = "";
        if (category) {
          encodedCategory = encodeURIComponent(category);
          categoryName = `/category/${encodedCategory}`;
        } else {
          categoryName = "";
        }

        const response = await fetch(
          `https://fakestoreapi.com/products${categoryName}`
        );
        const results = await response.json();
        if (results.length !== 0) {
          setOriginalItems(results);
          setItems(results);
        } else {
          setItems(false);
          setOriginalItems(false);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    if (username !== "Guest") {
      const updateGuest = cart.map((guest) =>
        guest.username === "Guest" ? { ...guest, username: username } : guest
      );
      setCart(updateGuest);
    }
  }, [username]);

  const [isAscending, setIsAscending] = useState(true);

  const sortByPrice = () => {
    setItems((prevItems) => {
      const ascending = !isAscending;
      const sortedItems = [...prevItems].sort((productA, productB) => {
        if (ascending) {
          return productA.price - productB.price;
        } else {
          return productB.price - productA.price;
        }
      });
      setIsAscending(ascending);
      return sortedItems;
    });
  };

  const [sortTitle, setSortTitle] = useState(true);

  const sortByTitle = () => {
    setItems((prevItems) => {
      const ascending = !sortTitle;
      const sortedProducts = [...prevItems].sort((a, b) => {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        if (ascending) {
          return titleB.localeCompare(titleA);
        } else {
          return titleA.localeCompare(titleB);
        }
      });
      setSortTitle(ascending);
      return sortedProducts;
    });
  };
  //sort Price
  const [minimum, setMinium] = useState("");
  const [maximun, setMaximum] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const MaximunMinimun = (minimum, maximun) => {
    if (minimum !== "" && maximun !== "") {
      setItems(
        [...originalItems].filter((range) => {
          if (range.price >= minimum && range.price <= maximun) {
            return range.price >= minimum && range.price <= maximun;
          } else {
            setPriceRange("Sorry, Price range not found.");
            return originalItems;
          }
        })
      );
    }
  };

  //rating filter
  const handleRating = (e) => {
    const ratingStar = parseFloat(e); // Convert e to a numeric value

    const filteredItems = originalItems.filter((star) => {
      return star.rating.rate >= ratingStar;
    });

    if (filteredItems.length === 0) {
      setPriceRange("Sorry, Rating range not found.");
    } else {
      setItems(filteredItems);
    }
  };

  //delete message after 5 seconds
  useEffect(() => {
    if (priceRange) {
      const timer = setTimeout(() => {
        setPriceRange("");
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [priceRange]);

  //sort products icon and bar
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      (event.type === "keydown" && event.key === "Tab") ||
      event.key === "Shift"
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
    >
      <List
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <ListItem key="Srot" disablePadding sx={{ display: "flex" }}>
          <ListItemText primary="Sort By" className="bold-text" />
        </ListItem>
        <ListItem key="sortTitle" disablePadding>
          <ListItemButton>
            <ListItemText primary="Title" onClick={() => sortByTitle()} />
          </ListItemButton>
        </ListItem>
        <ListItem key="SortPrice" disablePadding>
          <ListItemButton onClick={() => sortByPrice()}>
            <ListItemText primary="Price" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem key="Price" disablePadding sx={{ display: "flex" }}>
          <ListItemText primary="Price" className="bold-text" />
        </ListItem>
        <ListItem disablePadding key="upTo25">
          <ListItemButton onClick={() => MaximunMinimun(0, 25)}>
            <ListItemText primary="up to $25" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding key="upTo50">
          <ListItemButton onClick={() => MaximunMinimun(25, 50)}>
            <ListItemText primary="$25 to $50" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding key="upTo100">
          <ListItemButton onClick={() => MaximunMinimun(50, 100)}>
            <ListItemText primary="$50 to $100" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding key="upTo200">
          <ListItemButton onClick={() => MaximunMinimun(100, 200)}>
            <ListItemText primary="$100 to $200" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding key="upTo300">
          <ListItemButton onClick={() => MaximunMinimun(200, 300)}>
            <ListItemText primary="$200 to $300" />
          </ListItemButton>
        </ListItem>
      </List>
      <ListItem
        disablePadding
        key="upTo300"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Stack direction="column" spacing={2}>
          <FormControl variant="standard">
            <InputLabel htmlFor="input-with-icon-adornment">Min</InputLabel>
            <Input
              id="minimum"
              startAdornment={
                <InputAdornment position="start">
                  <AttachMoneyIcon />
                </InputAdornment>
              }
              onChange={(e) => setMinium(e.target.value)}
            />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel htmlFor="input-with-icon-adornment">Max</InputLabel>
            <Input
              id="maximun"
              startAdornment={
                <InputAdornment position="start">
                  <AttachMoneyIcon />
                </InputAdornment>
              }
              onChange={(e) => setMaximum(e.target.value)}
            />
          </FormControl>
          <Button
            variant="contained"
            onClick={() => {
              MaximunMinimun(minimum, maximun);
              toggleDrawer(anchor, false);
            }}
            className="buttonFilterPrice"
          >
            Search
          </Button>
        </Stack>
      </ListItem>
      <Divider />
      <List
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <ListItem key="CustomerReview" disablePadding sx={{ display: "flex" }}>
          <ListItemText primary="Customer Reviews" className="bold-text" />
        </ListItem>
        <ListItem disablePadding key="4start">
          <ListItemButton onClick={() => handleRating(4)}>
            <Rating name="read-only" value={4} size="small" readOnly />
            <span className="filterRating">& Up</span>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding key="3start">
          <ListItemButton onClick={() => handleRating(3)}>
            <Rating name="read-only" value={3} size="small" readOnly />
            <span className="filterRating">& Up</span>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding key="2start">
          <ListItemButton onClick={() => handleRating(2)}>
            <Rating name="read-only" value={2} size="small" readOnly />
            <span className="filterRating">& Up</span>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding key="start">
          <ListItemButton onClick={() => handleRating(1)}>
            <Rating name="read-only" value={1} size="small" readOnly />
            <span className="filterRating">& Up</span>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <div className="containerPage">
      {isLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <>
          <div className="filterButton">
            <Fragment key="left">
              <Button
                onClick={toggleDrawer("left", true)}
                className="filterProductButton"
              >
                Filters&nbsp;
                <TuneIcon />
              </Button>
              <Drawer
                anchor="left"
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
              >
                {list("left")}
              </Drawer>
            </Fragment>
          </div>
          {priceRange && (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                position: "fixed",
                zIndex: 3,
              }}
            >
              <Stack
                sx={{
                  width: "250px",
                }}
                spacing={2}
              >
                <Alert severity="error">{priceRange}</Alert>
              </Stack>
            </Box>
          )}
          <Grid
            container
            spacing={2}
            sx={{ justifyContent: "center" }}
            className="containerTopProducts"
          >
            {items ? (
              items
                .filter((products) => {
                  if (searchInput === "") {
                    return true; // Include all products when searchInput is empty
                  } else {
                    return (
                      products.category
                        .toLowerCase()
                        .includes(searchInput.toLowerCase()) ||
                      products.title
                        .toLowerCase()
                        .includes(searchInput.toLowerCase())
                    );
                  }
                })
                .map((products) => (
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    lg={3}
                    key={products.id}
                    className="positionCenter"
                    sx={{
                      fontFamily: "UbuntuNerdFont-Light",
                    }}
                  >
                    <Card className="card">
                      <Link to={`/product/${products.id}`}>
                        <CardActionArea>
                          <div className="imageBox">
                            <CardMedia
                              component="img"
                              className="productImagen"
                              image={products.image}
                            />
                          </div>
                          <CardContent className="ProductDetail">
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                              className="titleProduct"
                            >
                              {products.title}
                            </Typography>
                            <Typography variant="body2" component="div">
                              <div className="ratingProduct">
                                <Rating
                                  name="read-only"
                                  value={products.rating.rate}
                                  precision={0.5}
                                  size="small"
                                  readOnly
                                />
                                <span className="blue-style">
                                  ({products.rating.count})
                                </span>
                              </div>
                            </Typography>
                            <Typography
                              sx={{
                                fontFamily: "UbuntuNerdFont-bold",
                                fontSize: "1.1rem",
                              }}
                            >
                              ${products.price}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Link>
                    </Card>
                  </Grid>
                ))
            ) : (
              <Box className="errorContainerSingleProduct">
                <Typography component="div" variant="p" id="sorry">
                  SORRY
                </Typography>
                <Typography component="div" variant="p" id="productnotfound">
                  we could&apos;n find that page
                </Typography>
                <Typography component="div" variant="p" id="trysearching">
                  try searching or go to{" "}
                  <Link to="/" id="homePageError">
                    FredZone&apos;s home page
                  </Link>
                </Typography>
              </Box>
            )}
          </Grid>{" "}
        </>
      )}
    </div>
  );
}

export default Products;
