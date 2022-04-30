import logo from "./logo.svg";
import "./App.css";
import Appbar from "./components/Appbar";
import Login from "./components/Login";
import { Switch } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Book from "./components/Book";
import ErrorPage from "./components/ErrorPage";
import AddBook from "./components/AddBook";
import Profile from "./components/Profile";
import MyBooks from "./components/MyBooks";

function App() {
  return (
    <div id="root">
      <Router>
        <Appbar />
        <Routes>
          <Route path="/" element={<Book />}></Route>
          {/* <Route path="/profile/:username" element={<Profile/>}></Route> */}
          <Route path="/login" element={<Login />}></Route>
          <Route path="/addBook" element={<AddBook />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/myBooks" element={<MyBooks />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </Router>

      {/* <NavigationBar/> */}
    </div>
  );
}

export default App;
