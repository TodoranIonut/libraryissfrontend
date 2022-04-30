import React, { Fragment, useContext } from "react";
import {
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Table,
} from "@mui/material";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";

toast.configure();

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const ReadOnlyRow = ({
  book,
  handleEditBookClick,
  handleDeleteBook,
  handlReturnBookClick,
  handleBooking,
}) => {
  const { auth, setAuth } = useContext(AuthContext);
  let navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleClickOpenModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseDelete = (event, book) => {
    handleDeleteBook(event, book);
    handleClose();
  };

  return (
    <TableRow
      key={book.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell>{book.id}</TableCell>
      <TableCell>{book.title}</TableCell>
      <TableCell>{book.author}</TableCell>
      <TableCell>{book.status}</TableCell>
      {auth.userId ? (
        <TableCell>
          {auth.role === "ADMIN" || auth.role === "LIBRARIAN" ? (
            <Fragment>
              <Button onClick={(event) => handleEditBookClick(event, book)}>
                Edit
              </Button>
              {/* <Button onClick={(event) => handleDeleteBook(event, book)}>
                Delete
              </Button> */}
              <Button onClick={handleClickOpenModal}>Delete</Button>
              <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
              >
                <DialogContent>
                  <DialogContentText>
                    Are you sure you want to delete the book {book.id}{" "}
                    {book.title} {book.author}?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={handleClose}>
                    CLOSE
                  </Button>
                  <Button onClick={(event) => handleCloseDelete(event, book)}>
                    DELETE
                  </Button>
                </DialogActions>
              </Dialog>
            </Fragment>
          ) : null}
          {book.status === "UNAVAILABLE" &&
          (auth.role === "ADMIN" || auth.role === "LIBRARIAN") ? (
            <Button onClick={(event) => handlReturnBookClick(event, book)}>
              Return
            </Button>
          ) : (
            <Fragment>
              {book.status === "AVAILABLE" ? (
                <Button onClick={(event) => handleBooking(event, book)}>
                  Book
                </Button>
              ) : (
                <Button></Button>
              )}
            </Fragment>
          )}
        </TableCell>
      ) : null}
    </TableRow>
  );
};

export default ReadOnlyRow;
