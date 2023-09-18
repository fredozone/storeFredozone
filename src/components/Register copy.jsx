import * as React from "react";
import { useState } from "react";
import { createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
function Register() {
  const [page, setPage] = useState(0);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRPassword] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [number, setNumber] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      phone: "",
      username: "",
      password: "",
      stree: "",
      city: "",
      number: 0,
      zipcode: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [showRPassword, setShowRPassword] = useState(false);
  const handleClickShowRPassword = () => setShowRPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleNewUser = async () => {
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
          // address: {
          //   city: city,
          //   street: street,
          //   number: number,
          //   zipcode: zipcode,
          //   geolocation: {
          //     lat: "-37.3159",
          //     long: "81.1496",
          //   },
          // },
          phone: phone,
        }),
      });
      const result = await response.json();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid className=" registerForm" key="RegisterContainer">
          <Grid item xs={12} md={12} lg={12}>
            <div className="alignItemCenter registerTopPosition">
              <Box className="loginTitle">
                <Grid item xs={12} md={12} lg={12}>
                  <h1 className="bold-text">Sign up</h1>
                </Grid>
              </Box>

              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "500px", maxWidth: "80%" },
                }}
                noValidate
                autoComplete="off"
                key="formRegister"
                className="LoginForm"
                onSubmit={handleSubmit(handleNewUser)}
              >
                <div className="names">
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={6}>
                      <TextField
                        error={!!errors.name}
                        id={
                          errors.name
                            ? "outlined-error-helper-text-name"
                            : "outlined-basic-name"
                        }
                        {...register("name", {
                          required: "This is required.",
                          minLength: {
                            value: 4,
                            message: "Min Lengt is 4",
                          },
                          maxLength: {
                            value: 9,
                            message: "Max Lengt is 9",
                          },
                          pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message:
                              "Entered value does not match the allowed format.",
                          },
                        })}
                        sx={{
                          width: "100%",
                        }}
                        label="First Name"
                        variant="outlined"
                        key="name"
                        onChange={(e) => setName(e.target.value)}
                        helperText={errors.name?.message}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                      <TextField
                        error={!!errors.lastname}
                        id={
                          errors.lastname
                            ? "outlined-error-helper-text-lastname"
                            : "outlined-basic-lastname"
                        }
                        {...register("lastname", {
                          required: "This is required.",
                          minLength: {
                            value: 4,
                            message: "Min Lengt is 4",
                          },
                          maxLength: {
                            value: 20,
                            message: "Max Lengt is 20",
                          },
                          pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message:
                              "Entered value does not match the allowed format.",
                          },
                        })}
                        sx={{
                          width: "100%",
                        }}
                        label="Last Name"
                        variant="outlined"
                        key="lastname"
                        inputProps={{}}
                        onChange={(e) => setLastname(e.target.value)}
                        helperText={errors.lastname?.message}
                        required
                      />
                    </Grid>
                  </Grid>
                </div>
                <TextField
                  error={!!errors.email}
                  id={
                    errors.email
                      ? "outlined-error-helper-text-email"
                      : "outlined-basic-email"
                  }
                  {...register("email", {
                    required: "This is required.",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Entered value does not match email format",
                    },
                  })}
                  label="Email"
                  variant="outlined"
                  key="email"
                  onChange={(e) => setEmail(e.target.value)}
                  helperText={errors.email?.message}
                  required
                />
                <TextField
                  error={!!errors.phone}
                  id={
                    errors.phone
                      ? "outlined-error-helper-text-phone"
                      : "outlined-basic-phone"
                  }
                  {...register("phone", {
                    required: "This is required.",
                    minLength: {
                      value: 4,
                      message: "Min Lengt is 4",
                    },
                    maxLength: {
                      value: 15,
                      message: "Max Lengt is 15",
                    },
                    pattern: {
                      value: /^(0|[1-9]\d*)(\.\d+)?$/,
                      message: "Entered value does not match number format",
                    },
                  })}
                  label="Phone Number"
                  variant="outlined"
                  key="phone"
                  onChange={(e) => setPhone(e.target.value)}
                  helperText={errors.phone?.message}
                  required
                />
                <TextField
                  error={!!errors.username}
                  id={
                    errors.username
                      ? "outlined-error-helper-text-username"
                      : "outlined-basic-username"
                  }
                  {...register("username", {
                    required: "This is required.",
                    minLength: {
                      value: 4,
                      message: "Min Lengt is 4",
                    },
                    maxLength: {
                      value: 9,
                      message: "Max Lengt is 9",
                    },
                    pattern: {
                      value: /^[A-Za-z0-9\s]+$/,
                      message:
                        "Entered value does not match the allowed format.",
                    },
                  })}
                  label="username"
                  variant="outlined"
                  key="username"
                  onChange={(e) => setUsername(e.target.value)}
                  helperText={errors.username?.message}
                  required
                />
                <FormControl
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
                </div>
                <button
                  type="submit"
                  className="Button submit"
                  onClick={() => setPage((current) => current + 1)}
                >
                  Next
                </button>
              </Box>
              <Box>
                <Grid item xs={12} md={12} lg={12} className="ContainerButton">
                  <div className="divider-container">
                    <div className="divider-line"></div>
                    <div className="divider-text">Or</div>
                    <div className="divider-line"></div>
                  </div>
                </Grid>
              </Box>
              <Box>
                <Grid item xs={12} md={12} lg={12} className="ContainerButton">
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
    </>
  );
}

export default Register;
