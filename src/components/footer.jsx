import Grid from "@mui/material/Grid";
import StorefrontIcon from "@mui/icons-material/Storefront";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import CopyrightIcon from "@mui/icons-material/Copyright";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
function Footer() {
  return (
    <>
      <Grid
        container
        sx={{
          marginTop: "20px",
          backgroundColor: "white",
          padding: "20px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid item xs={12} md={6} lg={6}>
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: {
                xs: "center",
                lg: "flex-start",
                md: "flex-start",
              },
            }}
          >
            <StorefrontIcon className="logoBrand" />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
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
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Grid container sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Grid item xs={12} md={2} lg={2} className="DivFooterLink">
              <Link className="footerLink">HOME</Link>
            </Grid>
            <Grid item xs={12} md={2} lg={2} className="DivFooterLink">
              <Link className="footerLink">ABOUT</Link>
            </Grid>
            <Grid item xs={12} md={2} lg={2} className="DivFooterLink">
              <Link className="footerLink">CONTACT</Link>
            </Grid>
            <Grid item xs={12} md={2} lg={2} className="DivFooterLink">
              <Link className="footerLink">SUPPORT</Link>
            </Grid>
          </Grid>
        </Grid>
        <hr className="hrFooter" />

        <Grid item xs={12} md={6} lg={6}>
          <CopyrightIcon sx={{ width: "0.9rem" }} /> 2023 FredoZone. All rights
          reserved
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={6}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Link to="https://www.facebook.com" target="_blank">
            <FacebookIcon sx={{ fill: "var(--second-color)" }} />
          </Link>
          <Link to="https://www.instagram.com" target="_blank">
            <InstagramIcon sx={{ fill: "var(--second-color)" }} />
          </Link>
          <Link to="https://www.twitter.com" target="_blank">
            <TwitterIcon sx={{ fill: "var(--second-color)" }} />
          </Link>
        </Grid>
      </Grid>
    </>
  );
}

export default Footer;
