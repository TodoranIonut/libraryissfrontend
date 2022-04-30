import React from "react";
import {
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Table,
} from "@mui/material";
import Button from "@mui/material/Button";

const EditableRow = ({
  book,
  editFormData,
  handleEditFormChange,
  handleCancelClick,
  handleSaveClick,
}) => {
  return (
    <TableRow>
      <TableCell>{book.id}</TableCell>
      <TableCell>
        <input
          type="text"
          required="required"
          value={editFormData.title}
          name="title"
          onChange={handleEditFormChange}
        ></input>
      </TableCell>
      <TableCell>
        <input
          type="text"
          required="required"
          value={editFormData.author}
          name="author"
          onChange={handleEditFormChange}
        ></input>
      </TableCell>
      <TableCell>{book.status}</TableCell>
      <TableCell>
        <Button onClick={handleSaveClick}>Save</Button>
        {/* <Button type="Submit">Save</Button> */}
        <Button onClick={handleCancelClick}>Cancel</Button>
      </TableCell>
    </TableRow>
  );
};

export default EditableRow;
