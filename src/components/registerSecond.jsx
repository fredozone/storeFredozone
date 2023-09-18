import * as React from "react";
import { useState } from "react";
import { createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";

function registerSecond({ onNext, setUsername, setPassword }) {
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

  const [showRPassword, setShowRPassword] = useState(false);
  const handleClickShowRPassword = () => setShowRPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [password, setPPassword] = useState(""); // Initialize password
  const [rPassword, setRPassword] = useState(""); // Initialize rPassword

  const onSubmit = (data) => {
    onNext();
    setUsername(data.username);
    setPPassword(data.password);
    setPassword(data.password);
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "500px", maxWidth: "80%" },
      }}
      noValidate
      autoComplete="off"
      key="formRegister"
      className="LoginForm"
      onSubmit={handleSubmit(onSubmit)}
    >
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
            message: "Entered value does not match the allowed format.",
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
          onChange={(e) => setPPassword(e.target.value)}
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

      <button type="submit" className="Button submit">
        Sign up
      </button>
    </Box>
  );
}

export default registerSecond;
