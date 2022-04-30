import * as React from "react";
import { useState, useRef, useEffect, Fragment, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Container, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";

toast.configure();
const LOGIN_URL = "/login";
const LOGIN_URL2 = "/login2";

export default function Login() {
  let navigate = useNavigate();
  const paperStyle = {
    padding: "50px 20px",
    width: "80%",
    margin: "20px auto",
  };

  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const [role, setRole] = useState("");
  const [user, setUser] = useState(null);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const notifySuccess = (msg) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  };
  const notifFailed = (msg) => {
    toast.error(msg, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  };
  const handleLoginClick = async (e) => {
    e.preventDefault();
    //console.log(username, password);

    try {
      const response = await axios.get(
        LOGIN_URL,
        // JSON.stringify({ username, password }),
        {
          headers: {
             "Content-Type": "application/json",
             "username" : username,
             "password" : password
            },
          //withCredentials: true
        }
      );
      console.log(JSON.stringify(response?.data))
      const userId = response?.data?.id;
      const role = response?.data?.role;
      const booksList = response?.data?.booksList;
      console.log(booksList);
      setAuth({ userId,username, password, role, booksList})
      localStorage.setItem('user', response.data)
      setUsername("");
      setPassword("");
      setSuccess(true);
      navigate("/");
      notifySuccess("Login successfully!");
    } catch (err) {
      notifFailed("Failed login!")
      if(!err?.response){
        setErrMsg('No server response');
      }else if (err.response?.status === 400){
        setErrMsg('Mising username or password');
      }else if (err.response?.status === 401){
        setErrMsg('Unauthorized');
      }else{
        setErrMsg('Login failed');
      }
      errRef.current.focus();
    }
  };


  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);


    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        console.log('do validate')
      }
  }

  return (
    <Container path="/login">
      <Paper elevation={3} style={paperStyle}>
        <h2 style={{ color: "#05C3DD" }}>Login</h2>

        <Fragment>
          {success ? (null
            // <Fragment>
            // <p
            //   ref={errRef}
            //   className={errMsg ? "errmsg" : "offscreen"}
            //   aria-live="assertive"
            // >
            //   <b>Login Successfully!</b>
            // </p>
            // </Fragment>

          ) : (
            <Box
              component="form"
              sx={{
                "& > :not(style)": {
                  m: 2,
                  width: "50%",
                  position: "relative",
                  left: "25%",
                },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                style={{ position: "relative" }}
                id="usernameID"
                ref={userRef}
                label="Username"
                variant="standard"
                fullWidth
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <TextField
                id="passwordID"
                label="Password"
                variant="standard"
                type="password"
                required
                fullWidth
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <Button variant="contained" onClick={handleLoginClick}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.search()
                }
              }}
              >
                Log In
              </Button>
            </Box>
          )}
        </Fragment>
      </Paper>
    </Container>
  );
}