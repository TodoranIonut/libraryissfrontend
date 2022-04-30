import React, { useEffect, useState, Fragment, useContext } from "react";
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
import AuthContext from "../context/AuthProvider";

export default function Book() {
  const paperStyle = { padding: "50px 20px", width: 1000, margin: "20px auto" };
  const { auth, setAuth } = useContext(AuthContext);
  const [title, setTile] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("");
  const [books, setBooks] = useState([]);
  const [editBookId, setEditBookId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    id: "",
    title: "",
    author: "",
    status: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleEditBookClick = (e, book) => {
    e.preventDefault();
    setEditBookId(book.id);

    const formValues = {
      id: book.id,
      title: book.title,
      author: book.author,
      status: book.status,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditBookId(null);
  };

  const handleDeleteBook = (event, book) => {
    event.preventDefault();
    fetch(`http://localhost:8080/book/delete/${book.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      console.log("Book deleted");
    });
    const newBooksList = [...books];

    const index = books.findIndex((b) => b.id === book.id);

    newBooksList.splice(index, 1);

    setBooks(newBooksList);
  };

  const handlReturnBookClick = (event, book) => {
    event.preventDefault();
    if (auth?.userId){
      const formValues = {
      id: book.id,
      title: book.title,
      author: book.author,
      status: "AVAILABLE",
    };
    console.log(formValues);
    fetch(`http://localhost:8080/book/remove/${book.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      console.log("New book added");
    });
    const newBooksList = [...books];
    var index = books.findIndex((b) => b.id === book.id);
    newBooksList[index] = formValues;
    setBooks(newBooksList);

    index = auth.booksList.findIndex((ab) => ab.id === book.id);
    console.log(auth.booksList.length);
    auth.booksList.splice(index,1);
    console.log(auth.booksList.length);
   }
  };

  useEffect(() => {
    fetch("http://localhost:8080/book/getAll")
      .then((res) => res.json())
      .then((result) => {
        setBooks(result);
      });
  }, []);

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleSaveClick = (event) => {
    event.preventDefault();

    const editedBook = {
      id: editFormData.id,
      title: editFormData.title,
      author: editFormData.author,
      status: editFormData.status,
    };
    console.log(editFormData.id);
    console.log(editFormData.title);
    console.log(editFormData.author);
    console.log(editFormData.status);
    fetch(`http://localhost:8080/book/update/${editFormData.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedBook),
    }).then(() => {
      console.log("Book was updated");
    });

    const newBooksList = [...books];

    const index = books.findIndex((book) => book.id === editBookId);

    newBooksList[index] = editedBook;

    setBooks(newBooksList);
    //window.location.reload(false);
    setEditBookId(null);
  };

  const handleBooking = (event, book) => {
    if (auth?.userId) {
      event.preventDefault();
      const formValues = {
        id: book.id,
        title: book.title,
        author: book.author,
        status: "UNAVAILABLE",
      };
      console.log(formValues);
      fetch(`http://localhost:8080/book/addBook/${book.id}/to/${auth.userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }).then(() => {
        console.log("New book asigned to user");
      });
      const newBooksList = [...books];
      const index = books.findIndex((b) => b.id === book.id);
      newBooksList[index] = formValues;
      setBooks(newBooksList);
      auth.booksList.push(formValues);
    }
  };

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h2 style={{ color: "#05C3DD" }}>Books</h2>
        <TableContainer component={Paper} class="sizer">
          {/* <form onSubmit={handleSaveClick}> */}
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
                <TableCell>Status</TableCell>
                {auth.userId ?(
                  <TableCell>Action</TableCell>
                ):(null)}
                
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
                      .includes(searchTerm.toLowerCase()) ||
                    book.status.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return book;
                  }
                })
                .map((book) => (
                  <Fragment>
                    {editBookId === book.id ? (
                      <EditableRow
                        book={book}
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick}
                        handleSaveClick={handleSaveClick}
                      />
                    ) : (
                      <ReadOnlyRow
                        book={book}
                        handleEditBookClick={handleEditBookClick}
                        handleDeleteBook={handleDeleteBook}
                        handlReturnBookClick={handlReturnBookClick}
                        handleBooking={handleBooking}
                      />
                    )}
                  </Fragment>
                ))}
            </TableBody>
          </Table>
          {/* </form> */}
        </TableContainer>
      </Paper>
    </Container>
  );
}
