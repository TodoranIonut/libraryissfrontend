import React, { useEffect, useState, Fragment , useContext} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container, Paper } from "@mui/material";
import {
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Table,
} from "@mui/material";
import Button from "@mui/material/Button";
import EditableRow from "./EditableRow";
import ReadOnlyRow from "./ReadOnlyRow";
import AddBook from "./AddBook";
import { Search } from "@mui/icons-material";
import AuthContext from '../context/AuthProvider';

function MyBooks() {

    const paperStyle = { padding: "50px 20px", width: 1000, margin: "20px auto" };
    const [books, setBooks] = useState([]);
    const { auth, setAuth } = useContext(AuthContext);

    useEffect(() => {
      setBooks(auth.booksList);
    });
  
    const [searchTerm, setSearchTerm] = useState("");

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h2 style={{ color: "#05C3DD" }}> My Books</h2>
        <TableContainer component={Paper} class="sizer">
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            label="Search"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
          <Table sx={{ minWidth: 750 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Code</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books
                .filter((book) => {
                  if (searchTerm == "") {
                    return book;
                  } else if (
                    book.id.toString().includes(searchTerm) ||
                    book.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                    book.author
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return book;
                  }
                })
                .map((book) => (
                    <TableRow
                    key={book.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{book.id}</TableCell>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}

export default MyBooks;
