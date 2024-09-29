"use client";

import * as React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Clarification } from "@prisma/client";
import Link from "next/link";
import {
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/navigation";

interface ClarificationListProps {
  clarifications: Clarification[];
}

export function ClarificationList({ clarifications }: ClarificationListProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedClarification, setSelectedClarification] = useState<Clarification | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false); // Control the display of the edit dialog
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false); // Control the display of the delete confirmation dialog
  const [editText, setEditText] = useState(""); // Text in the edit field
  const router = useRouter();

  // Open the action menu
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, clarification: Clarification) => {
    setAnchorEl(event.currentTarget);
    setSelectedClarification(clarification);
  };

  // Close the action menu
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedClarification(null);
  };

  // Open the delete confirmation dialog
  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
  };

  // Close the delete confirmation dialog
  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setSelectedClarification(null);
  };

  // Handle deleting clarification
  const handleDeleteClarification = async () => {
    if (!selectedClarification) return;

    const { id, assignmentId } = selectedClarification;

    try {
      const response = await fetch(
        `/api/assignments/${assignmentId}/clarification/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Successfully deleted, refresh the page or update the table
        router.refresh();
        handleMenuClose();
        handleDeleteDialogClose(); // Close the delete confirmation dialog
      } else {
        console.error("Failed to delete clarification:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting clarification:", error);
    }
  };

  // Open the edit dialog
  const handleEditClarification = () => {
    if (selectedClarification) {
      setEditText(selectedClarification.text); // Set the current clarification text as the initial value in the edit field
      setDialogOpen(true);
    }
  };

  // Close the edit dialog
  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedClarification(null);
  };

  // Save the edited clarification
  const handleSaveEdit = async () => {
    if (!selectedClarification) return;

    const { id, assignmentId } = selectedClarification;

    try {
      const response = await fetch(
        `/api/assignments/${assignmentId}/clarification/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: editText }), // Send the edited text
        }
      );

      if (response.ok) {
        // Successfully saved, refresh the page or update the table
        router.refresh();
        setDialogOpen(false);
      } else {
        console.error("Failed to update clarification:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating clarification:", error);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="clarification table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Content</TableCell>
              <TableCell align="right">Assignment ID</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clarifications.map((clarification) => (
              <TableRow
                key={clarification.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {clarification.id}
                </TableCell>
                <TableCell align="right">
                  <Link href={`/clarifications/${clarification.id}`}>
                    {clarification.text}
                  </Link>
                </TableCell>
                <TableCell align="right">{clarification.assignmentId}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={(e) => handleMenuOpen(e, clarification)}>
                    <MoreVertIcon />
                  </IconButton>
                  {/* Action menu */}
                  <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                    <MenuItem onClick={handleDeleteDialogOpen}>Delete</MenuItem>
                    <MenuItem onClick={handleEditClarification}>Edit</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit clarification dialog */}
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Edit Clarification</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Modify the clarification text below and click "Save" to update it.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Clarification Text"
            type="text"
            fullWidth
            value={editText}
            onChange={(e) => setEditText(e.target.value)} // Update the text in the edit field
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete clarification confirmation dialog */}
      <Dialog open={isDeleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this clarification?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>CANCEL</Button>
          <Button onClick={handleDeleteClarification} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
