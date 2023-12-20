
import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';
import Cookies from "js-cookie"


const Home = () => {

  const navigate = useNavigate();

  const [textMessage, setTextMessage] = useState("")
  const [searchMessage, setSearchMessage] = useState("")
  const [foundData, setFoundData] = useState("")

  // adding text message to array
  const addTextMessage = (e) => {
    if (textMessage.trim() === "") {
      toast.error("Please enter some text");
      return;
    }
    setTextMessage("");
    let oldData = JSON.parse(Cookies.get("textMessageArr"));
    if (oldData !== undefined && oldData.length > 0) {
      let newData = [...oldData, textMessage];
      Cookies.set("textMessageArr", JSON.stringify(newData))

    } else {
      let newData = [];
      newData.push(textMessage)
      Cookies.set("textMessageArr", JSON.stringify(newData))
    }
    toast.success("Text sumitted successfully.")
  }


  // search inserted data
  const handleSearchTextMessage = () => {
    let cookiesData = JSON.parse(Cookies.get("textMessageArr"));
    for (let i = 0; i < cookiesData.length; i++) {
      if (searchMessage.toLowerCase() === cookiesData[i].toLowerCase()) {
        setFoundData(cookiesData[i]);
        return;
      }
    }
    setFoundData("No Text Message Found")
    return;
  }

  // logout function
  const handleLogout = () => {
    Cookies.remove("isLogin");
    navigate("/login")
  }

  // remove data stored in cookies
  const removeCookiesData = () => {
    Cookies.remove("textMessageArr");
    toast.success("Data removed from cookies successfully")
  }
  // useEffect
  useEffect(() => {
    console.log("cookies data", Cookies.get("textMessageArr"))

    let isLogin = Cookies.get("isLogin");
    console.log(isLogin)
    if (isLogin !== "true") {
      navigate("/login")
    }
  }, [textMessage, foundData]);

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Toolbar>
          <TextField
            label="Enter Text Message"
            variant="outlined"
            margin="normal"
            value={textMessage}
            onChange={(e) => setTextMessage(e.target.value)}
          />
          <Button onClick={addTextMessage} sx={{ textTransform: "capitalize", marginLeft: "20px" }} variant='contained'>Submit Text</Button>
        </Toolbar>
        <br />

        <Toolbar>
          <TextField
            label="Search Text Message"
            variant="outlined"
            margin="normal"
            value={searchMessage}
            onChange={(e) => setSearchMessage(e.target.value)}
          />

          {
            Cookies.get("textMessageArr") === undefined ?
              <Button sx={{ textTransform: "capitalize", marginLeft: "20px" }} variant='contained' disabled onClick={handleSearchTextMessage}>Search Text</Button>
              :
              <Button sx={{ textTransform: "capitalize", marginLeft: "20px" }} variant='contained' onClick={handleSearchTextMessage}>Search Text</Button>

          }
        </Toolbar>
        <br />

        <h3>Searched Text Message</h3>
        <div style={{ height: "300px", width: "500px", border: "1px solid black" }}>
          {foundData}
        </div>

        <Toolbar sx={{ marginTop: "20px" }}>
          <Button variant='contained' color='warning' onClick={removeCookiesData}>clear All Cookie</Button>
          <Button variant='contained' color='error' sx={{ marginLeft: "40px" }} onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </Box>
    </div>
  )
}

export default Home