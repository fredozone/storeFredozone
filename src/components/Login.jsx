import * as React from "react";
import { useState, useEffect } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
function Login({ setToken }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const setUsernameAPI = "hopkins";
  const setPasswordAPI = "William56$hj";

  const handleLogin = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      if (!response.ok) {
        const errorResponse = await response.text();
        console.log("Error response:", errorResponse);
        return;
      }
      const result = await response.json();
      if (result.token) {
        setMessage("Login successful! Enjoy your stay.");
        setMessageType("success");
        setToken(result.token);
        localStorage.setItem("username", username);
        navigate("/");
      } else {
        setMessage("username or password is incorrect");
        setMessageType("error");
      }
    } catch (error) {
      console.log(error);
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
    <div>
      <div className="alertStyleBox">
        {message && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity={messageType}>{message}</Alert>
          </Stack>
        )}
      </div>
      <div
        className="containerPage loginConatinerFooter"
        style={{ minHeight: "71.2vh" }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid className="containerForm" key="loginContainer">
            <Grid item xs={12} md={12} lg={12}>
              <div className="alignItemCenter">
                <Box className="loginTitle">
                  <Grid item xs={12} md={12} lg={12}>
                    <h1 className="bold-text">Login</h1>
                  </Grid>
                </Box>

                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": {
                      m: 1,
                      width: "500px",
                      maxWidth: "60%",
                    },
                  }}
                  noValidate
                  autoComplete="off"
                  key="formLogin"
                  className="LoginForm"
                  value="hopkins"
                  onSubmit={handleSubmit(handleLogin)}
                >
                  <TextField
                    error={!!errors.username}
                    id={
                      errors.username
                        ? "outlined-error-helper-text"
                        : "outlined-basic"
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
                    })}
                    label="username"
                    variant="outlined"
                    key="login"
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
                          ? "outlined-error-helper-text"
                          : "outlined-basic"
                      }
                      htmlFor="outlined-adornment-password"
                      required
                    >
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id={
                        errors.password
                          ? "outlined-error-helper-text"
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
                          value: 25,
                          message: "Max Lengt is 25",
                        },
                      })}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormHelperText>{errors.password?.message}</FormHelperText>
                  </FormControl>
                  <button type="submit" className="Button submit">
                    Login
                  </button>
                </Box>
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
                    <Link to="/register" className="linkStyle centerButton">
                      <button className="Button orSignupLogin">Signup</button>
                    </Link>
                  </Grid>
                </Box>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default Login;
