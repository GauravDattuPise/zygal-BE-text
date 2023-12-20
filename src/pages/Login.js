

import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';
import Cookies from "js-cookie"

const Login = () => {

  const userCredentials = `[{"email_id":"sample@gmail.com","password":"1234"},{"email_id":"sample1@gmail.com","password":"9876"}]`
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  })

  const handleInputChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleLogin = () => {

    if (inputs.email.trim() === "" || inputs.password.trim() === "") {
      toast.error("Please fill all details");
      return;
    }

    let credentials = JSON.parse(userCredentials);
    let valid = false;
    for (let i = 0; i < credentials.length; i++) {
      if (credentials[i].email_id === inputs.email && credentials[i].password === inputs.password) {
        valid = true;
        Cookies.set("isLogin", "true")
        toast.success("Login successful!")
        navigate("/")
        break;
      }
    }
    if (valid === false) {
      toast.error("user credentials not found!")
    }
  };

  useEffect(() => {
    let isLogin = Cookies.get("isLogin");
    console.log(isLogin)
    if (isLogin === "true") {
      navigate("/")
    }
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <TextField
        label="Email"
        type="email"
        variant="outlined"
        margin="normal"
        name="email"
        value={inputs.email}
        onChange={handleInputChange}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        margin="normal"
        name="password"
        value={inputs.password}
        onChange={handleInputChange}
      />
      <Button variant="contained" onClick={handleLogin}>
        Login
      </Button>
      <h4>{userCredentials}</h4>
    </Box>
  );
};

export default Login;
