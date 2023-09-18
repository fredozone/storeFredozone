import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useState, useEffect } from "react";
import Badge from "@mui/material/Badge";
const pages = ["Products", "Cart", "Login", "Logout"];
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

// const settings = ["Cart", "Login", "Logout"];
import { Link, NavLink } from "react-router-dom";

function Navbar({ auth, countProduct, setSearchInput }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [category, setCategory] = useState([]);
  const isCart = location.pathname === "/cart";
  const isLoginPage = location.pathname === "/login";
  const isRegister = location.pathname === "/register";
  const [locationPage, setLocationPage] = useState("");

  useEffect(() => {
    if (isCart || isLoginPage || isRegister) {
      setLocationPage("displayNot");
    } else {
      setLocationPage("");
    }
  }, [isCart, isLoginPage, isRegister]);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  useEffect(() => {
    const handleAllCategory = async () => {
      const responde = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      const result = await responde.json();
      setCategory(result);
    };
    handleAllCategory();
  }, []);

  return (
    <>
      <AppBar
        position="static"
        sx={{
          position: "fixed",
          top: 0,
          zIndex: 3,
          backgroundColor: "var(--primary-color)",
          boxShadow: "none",
        }}
        key="navbar"
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <StorefrontIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
              className="logoBrand"
            />
            {/* mobile view links  */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "var(--second-color)",
                textDecoration: "none",
                fontSize: "1.3rem",
              }}
            >
              Fred<span className="brandNameLastSection">Zone</span>
            </Typography>

            <Box
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
              className="navBarPositionTop test"
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page, index) => {
                  if (page === "Products") {
                    return (
                      <MenuItem
                        key={`${page}-${index}`}
                        onClick={handleCloseNavMenu}
                        className="TESTING"
                      >
                        <NavLink
                          to="/"
                          key={`Product-${page}`}
                          onClick={handleCloseNavMenu}
                          className="NavBarLinks bold-text"
                          tabIndex={index + 1}
                        >
                          {page}
                        </NavLink>
                      </MenuItem>
                    );
                  } else if (page === "Login" && auth === false) {
                    return (
                      <MenuItem
                        key={`${page}-${index}`}
                        onClick={handleCloseNavMenu}
                        className={`${auth === false ? "displayNone" : ""}`}
                      >
                        <NavLink
                          to="/login"
                          key={`login-${index}`}
                          onClick={handleCloseNavMenu}
                          className={`NavBarLinks bold-text`}
                          tabIndex={index + 1}
                        >
                          {page}
                        </NavLink>
                      </MenuItem>
                    );
                  } else if (page === "Logout" && auth === true) {
                    return (
                      <MenuItem
                        key={`${page}-${index}`}
                        onClick={handleCloseNavMenu}
                        className={`${auth === true ? "displayNone" : ""}`}
                      >
                        <NavLink
                          to="/logout"
                          key={`logout-${index}`}
                          onClick={handleCloseNavMenu}
                          className={`NavBarLinks bold-text`}
                          tabIndex={index + 1}
                        >
                          {page}
                        </NavLink>
                      </MenuItem>
                    );
                  } else if (page === "Cart") {
                    return (
                      <MenuItem
                        key={`${page}-${index}`}
                        onClick={handleCloseNavMenu}
                        // className={`${auth === true ? "displayNone" : ""}`}
                      >
                        <NavLink
                          to="/cart"
                          key={`cart-${page}`}
                          onClick={handleCloseNavMenu}
                          className="NavBarLinks bold-text"
                          tabIndex={index + 1}
                        >
                          <Badge
                            badgeContent={countProduct}
                            color="info"
                            max={999}
                          >
                            <ShoppingCartOutlinedIcon
                              sx={{ fontSize: "1.4rem" }}
                            />
                            {page}
                          </Badge>
                        </NavLink>
                      </MenuItem>
                    );
                  } else {
                    return null; // Return null for other cases
                  }
                })}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "var(--second-color)",
                textDecoration: "none",
                fontSize: "1.3rem",
              }}
              className="iconBrandName"
            >
              <StorefrontIcon
                sx={{
                  display: { xs: "flex", md: "none" },
                  mr: 1,
                }}
                className="logoBrand"
              />{" "}
              Fred<span className="brandNameLastSection">Zone</span>
            </Typography>
            <Box
              key="menuStyle"
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              className="menuStyle"
            >
              {pages.map((page, index) =>
                page === "Products" ? (
                  <NavLink
                    to="/"
                    key={`Product-${page}`}
                    onClick={handleCloseNavMenu}
                    className="NavBarLinks bold-text"
                  >
                    {page}
                  </NavLink>
                ) : (
                  <React.Fragment key={`empty-nothing${index}`} />
                )
              )}
              <input
                type="text"
                placeholder="Search…"
                className="SearchInput"
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <Box
                sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
                className="cartLogout"
              >
                {pages.map((setting, index) =>
                  setting === "Login" ? (
                    auth === false ? (
                      <NavLink
                        to="/login"
                        key={`login-${index}`}
                        onClick={handleCloseNavMenu}
                        className="NavBarLinks bold-text"
                        tabIndex={index + 1}
                      >
                        {setting}
                      </NavLink>
                    ) : null
                  ) : setting === "Logout" ? (
                    auth === true && auth ? (
                      <NavLink
                        to="/logout"
                        key={`logout-${index}`}
                        onClick={handleCloseNavMenu}
                        className="NavBarLinks bold-text"
                        tabIndex={index + 1}
                      >
                        {setting}
                      </NavLink>
                    ) : null
                  ) : setting === "Cart" ? (
                    // auth === true ? (
                    <NavLink
                      to="/cart"
                      key={`cart-${index}`}
                      onClick={handleCloseNavMenu}
                      className="NavBarLinks bold-text"
                      tabIndex={index + 1}
                    >
                      <Badge badgeContent={countProduct} color="info" max={999}>
                        <ShoppingCartOutlinedIcon sx={{ fontSize: "1.4rem" }} />
                        {setting}
                      </Badge>
                    </NavLink>
                  ) : (
                    // ) : null
                    <React.Fragment key={`empty-${index}`} />
                  )
                )}
              </Box>
            </Box>
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            ></Box>
          </Toolbar>
        </Container>
        <Box className="categoryList">
          {category.map((category, index) => (
            <Link key={index} to={`/${category}`} className="categoryLink">
              <div>{category}</div>
            </Link>
          ))}
          <Link key="allProducts" to={`/`} className="categoryLink">
            <div>All Products</div>
          </Link>
        </Box>
      </AppBar>
      <Box className="mobileView">
        <input
          type="text"
          placeholder="Search…"
          className={`SearchInput ${locationPage}`}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </Box>
    </>
  );
}
export default Navbar;
