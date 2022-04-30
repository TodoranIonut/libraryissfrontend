import React, { useEffect, useState, Fragment } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container, Paper } from "@mui/material";

import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export default function AddBook() {
  const paperStyle = { padding: "50px 20px", width: 1000, margin: "20px auto" };
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("AVAILABLE");
  const notify = () => {
    toast.success("Book was added successfully!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  };
  const handleAddBookClick = (e) => {
    e.preventDefault();
    const book = { title, author, status };
    console.log(book);
    fetch("http://localhost:8080/book/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    }).then(() => {
      console.log("New book added");
      notify();
    });
    setTitle("");
    setAuthor("");
  };

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h2 style={{ color: "#05C3DD" }}>Add Book</h2>

        <Box
          component="form"
          sx={{
            "& > :not(style)": {
              m: 1,
              width: "50%",
              position: "relative",
              left: "25%",
            },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            label="Title"
            variant="standard"
            fullWidth
            required="true"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Author"
            variant="standard"
            fullWidth
            required="true"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <Button variant="contained" onClick={handleAddBookClick}>
            Add Book
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
