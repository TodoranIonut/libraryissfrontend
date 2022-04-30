import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import { useContext, Fragment } from "react";

function Appbar() {
    let navigate = useNavigate();
    const libTitle = "My Library";
  const { auth, setAuth } = useContext(AuthContext);

  function handleLogOut(){
    setAuth({});
    //localStorage.clear();
    navigate("/");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          
          <Typography
            variant="h6"
            component="div"
            align="left"
            sx={{ flexGrow: 1 }}
          >
           
            {auth.userId ? (
              <Fragment>
              <b> My Library </b> --- {auth.username} ---
            </Fragment>
          ):(
            <b> My Library </b>
          )}
          </Typography>

          <Button // {user ? (<p>Avem</p>):(<p>Nu avem</p>)}
            color="inherit"
            onClick={() => {
              navigate("/");
            }}
          >
            Books
          </Button>
          {auth.username && (auth.role === "ADMIN" || auth.role === "LIBRARIAN") ? (
          <Button
            color="inherit"
            onClick={() => {
              navigate("/addBook");
            }}
          >
            Add Book
          </Button>
          ):(null)}

          {auth.username ? (
            <Fragment>
             <Button
             color="inherit"
             onClick={() => {
               navigate("/profile");
             }}
           >
             Profile
           </Button>
           <Button
              color="inherit"
              onClick={() => {
                navigate("/myBooks");
              }}
            >
              My books
            </Button>
            <Button
              color="inherit"
              onClick={handleLogOut}
              
            >
              LogOut
            </Button>
            </Fragment>
          ) : (
            <Button
              color="inherit"
              onClick={() => {
                navigate("/login");
              }}
            >
              Log In
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Appbar;
