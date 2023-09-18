import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import InputLabel from "@mui/material/InputLabel";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import FormControl from "@mui/material/FormControl";
// import InputAdornment from "@mui/material/InputAdornment";
// import IconButton from "@mui/material/IconButton";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import FormHelperText from "@mui/material/FormHelperText";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import RegisterFirst from "./registerFirst";
import RegisterSecond from "./registerSecond";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import DoneIcon from "@mui/icons-material/Done";
function Register() {
  const [page, setPage] = useState(0);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [number, setNumber] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleNext = () => {
    setPage(page + 1);
  };

  const handleNewUser = useCallback(async () => {
    //first letter uppercase NAME
    const firstLetter = name.charAt(0);
    const firstLetterCap = firstLetter.toUpperCase();
    const remainingLetters = name.slice(1);
    const capitalizedWord = firstLetterCap + remainingLetters;

    //first letter uppercase LASTNAME
    const firstLetterLastName = lastname.charAt(0);
    const firstLetterCapLastName = firstLetterLastName.toUpperCase();
    const remainingLettersLastName = lastname.slice(1);
    const capitalizedWordLastName =
      firstLetterCapLastName + remainingLettersLastName;
    try {
      const response = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          username: username.toLowerCase(),
          password: password,
          name: {
            firstname: capitalizedWord,
            lastname: capitalizedWordLastName,
          },
          address: {
            city: city,
            street: street,
            number: number,
            zipcode: zipcode,
            geolocation: {
              lat: "-37.3159",
              long: "81.1496",
            },
          },
          phone: phone,
        }),
      });
      const result = await response.json();
      if (result.id) {
        setMessage("Thanks for signing up for our service.");
        setMessageType("success");
        setPage(0);
      } else {
        setMessage("An error occurred while signing up. Please try again.");
        setMessageType("error");
      }
    } catch (error) {
      console.error(error);
    }
  }, [
    email,
    username,
    password,
    name,
    lastname,
    city,
    street,
    number,
    zipcode,
    phone,
  ]);

  useEffect(() => {
    if (page >= 2) {
      handleNewUser();
    }
  }, [handleNewUser, page]);

  const displayPage = () => {
    if (page === 0) {
      return (
        <RegisterFirst
          onNext={handleNext}
          setName={setName}
          setLastname={setLastname}
          setEmail={setEmail}
          setPhone={setPhone}
          setUsername={setUsername}
          setStreet={setStreet}
          setCity={setCity}
          setNumber={setNumber}
          setZipcode={setZipcode}
        />
      );
    } else {
      return (
        <RegisterSecond
          onNext={handleNext}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      );
    }
  };

  //delete message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [message]);
  return (
    <>
      <div className="alertStyleBox">
        {message && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity={messageType}>{message}</Alert>
          </Stack>
        )}
      </div>
      <div
        className="containerPage loginConatinerFooter"
        style={{ minHeight: "100vh" }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid className=" registerForm" key="RegisterContainer">
            <Grid item xs={12} md={12} lg={12}>
              <div className="alignItemCenter registerTopPosition">
                <Box className="registerTitle">
                  <Grid item xs={12} md={12} lg={12}>
                    <h1 className="bold-text">Sign up</h1>
                  </Grid>
                </Box>
                <Box className="sinupBar">
                  <Grid item xs={5} md={5} lg={5}>
                    {page < 1 ? (
                      <h2 className="bold-text">1</h2>
                    ) : (
                      <h2>
                        <DoneIcon
                          style={{ fill: "var(--second-color)" }}
                        ></DoneIcon>
                      </h2>
                    )}
                  </Grid>
                  <Grid item xs={2} md={2} lg={2}>
                    {page < 1 ? (
                      <div
                        style={{
                          height: "2px",
                          backgroundColor: "black",
                          width: "74px",
                          marginInline: "5px",
                        }}
                      ></div>
                    ) : (
                      <div
                        style={{
                          height: "2px",
                          backgroundColor: "var(--second-color)",
                          width: "74px",
                          marginInline: "5px",
                        }}
                      ></div>
                    )}
                  </Grid>
                  <Grid item xs={5} md={5} lg={5}>
                    {page == 2 ? (
                      <DoneIcon
                        style={{ fill: "var(--second-color)" }}
                      ></DoneIcon>
                    ) : (
                      <h2 className="bold-text">2</h2>
                    )}
                  </Grid>
                </Box>

                {/* <FormControl
                  sx={{ m: 1, width: "25ch" }}
                  variant="outlined"
                  key="password"
                  error={!!errors.password}
                >
                  <InputLabel
                    id={
                      errors.password
                        ? "outlined-error-helper-text-password"
                        : "outlined-basic-password"
                    }
                    htmlFor="outlined-adornment-password"
                    required
                  >
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id={
                      errors.password
                        ? "outlined-error-helper-text-password"
                        : "outlined-adornment-password"
                    }
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    {...register("password", {
                      required: "This is required.",
                      minLength: {
                        value: 4,
                        message: "Min Lengt is 4",
                      },
                      maxLength: {
                        value: 9,
                        message: "Max Lengt is 9",
                      },
                    })}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <FormHelperText>{errors.password?.message}</FormHelperText>
                </FormControl>
                <FormControl
                  sx={{ m: 1, width: "25ch" }}
                  variant="outlined"
                  key="rpassword"
                  error={!!errors.rpassword}
                >
                  <InputLabel
                    id={
                      errors.rpassword
                        ? "outlined-error-helper-text-rpassword"
                        : "outlined-basic"
                    }
                    htmlFor="outlined-adornment-password"
                  >
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id={
                      errors.rpassword
                        ? "outlined-error-helper-text-rpassword"
                        : "outlined-adornment-rpassword"
                    }
                    type={showRPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowRPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showRPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    {...register("rpassword", {
                      required: "This is required.",
                      validate: (value) =>
                        value === password || "The passwords do not match",
                    })}
                    onChange={(e) => setRPassword(e.target.value)}
                  />
                  <FormHelperText>{errors.rpassword?.message}</FormHelperText>
                </FormControl>
                <TextField
                  error={!!errors.street}
                  id={
                    errors.street
                      ? "outlined-error-helper-text-street"
                      : "outlined-basic-street"
                  }
                  {...register("street", {
                    required: "This is required.",
                    minLength: {
                      value: 4,
                      message: "Min Lengt is 4",
                    },
                    pattern: {
                      value: /^[A-Za-z0-9\s]+$/,
                      message:
                        "Entered value does not match the allowed format.",
                    },
                  })}
                  label="Street"
                  variant="outlined"
                  key="street"
                  onChange={(e) => setStreet(e.target.value)}
                  helperText={errors.street?.message}
                  required
                />
                <TextField
                  error={!!errors.city}
                  id={
                    errors.city
                      ? "outlined-error-helper-text-city"
                      : "outlined-basic-city"
                  }
                  {...register("city", {
                    required: "This is required.",
                    minLength: {
                      value: 2,
                      message: "Min Lengt is 2",
                    },
                  })}
                  label="City"
                  variant="outlined"
                  key="city"
                  onChange={(e) => setCity(e.target.value)}
                  helperText={errors.city?.message}
                  required
                />
                <div className="names">
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={6}>
                      <TextField
                        error={!!errors.number}
                        id={
                          errors.number
                            ? "outlined-error-helper-text-number"
                            : "outlined-basic-number"
                        }
                        {...register("number", {
                          required: "This is required.",
                          minLength: {
                            value: 4,
                            message: "Min Lengt is 4",
                          },
                        })}
                        sx={{
                          width: "100%",
                        }}
                        label="Number"
                        variant="outlined"
                        key="number"
                        onChange={(e) => setNumber(e.target.value)}
                        helperText={errors.number?.message}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                      <TextField
                        error={!!errors.zipcode}
                        id={
                          errors.zipcode
                            ? "outlined-error-helper-text-zipcode"
                            : "outlined-basic-zipcode"
                        }
                        {...register("zipcode", {
                          required: "This is required.",
                          minLength: {
                            value: 4,
                            message: "Min Lengt is 4",
                          },
                          pattern: {
                            value: /^\d{5}$/,
                            message: "Please enter a valid 5-digit Zip Code",
                          },
                        })}
                        sx={{
                          width: "100%",
                        }}
                        label="Zipcode"
                        variant="outlined"
                        key="zipcode"
                        onChange={(e) => setZipcode(e.target.value)}
                        helperText={errors.zipcode?.message}
                        required
                      />
                    </Grid>
                  </Grid>
                </div> */}
                {displayPage()}
                {/* <button
                type="submit"
                className="Button submit"
                
              >
                Next
              </button> */}
                {/* </Box> */}
                <Box>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    className="ContainerButton"
                  >
                    <div className="divider-container">
                      <div className="divider-line"></div>
                      <div className="divider-text">Or</div>
                      <div className="divider-line"></div>
                    </div>
                  </Grid>
                </Box>
                <Box>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    className="ContainerButton"
                  >
                    <Link to="/login" className="linkStyle centerButton">
                      <button className="Button orSignupLogin orLoginSignup">
                        Login
                      </button>
                    </Link>
                  </Grid>
                </Box>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}

export default Register;
