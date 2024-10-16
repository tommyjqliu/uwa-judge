"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Clarification } from "@prisma/client";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // Import useRouter

interface ClarificationListProps {
  clarifications: Clarification[];
  onDataUpdate: () => void; // Add a callback function to notify the Page component of data updates
}

export function ClarificationList({
  clarifications,
  onDataUpdate,
}: ClarificationListProps) {
  const router = useRouter(); // Initialize router
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");
  const [currentAssignmentId, setCurrentAssignmentId] = useState<number | null>(
    null,
  );
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Handle editing clarification
  const handleEdit = (
    clarificationId: number,
    text: string,
    assignmentId: number,
  ) => {
    setEditId(clarificationId);
    setEditText(text);
    setCurrentAssignmentId(assignmentId);
  };

  // Handle saving updated clarification
  const handleSave = async () => {
    if (editId !== null && currentAssignmentId !== null) {
      const response = await fetch(
        `/api/assignments/${currentAssignmentId}/clarification/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: editText }),
        },
      );

      if (response.ok) {
        // After a successful update, notify the parent component to refresh the data
        setEditId(null);
        setEditText("");
        setCurrentAssignmentId(null);
        onDataUpdate(); // Notify parent component
      } else {
        console.error("Failed to update clarification");
      }
    }
  };

  // Handle deleting clarification
  const handleDelete = async (
    clarificationId: number,
    assignmentId: number,
  ) => {
    const response = await fetch(
      `/api/assignments/${assignmentId}/clarification/${clarificationId}`,
      {
        method: "DELETE",
      },
    );

    if (response.ok) {
      // After a successful deletion, notify the parent component to refresh the data
      setDeleteId(null);
      setIsDeleteDialogOpen(false);
      onDataUpdate(); // Notify parent component
    } else {
      console.error("Failed to delete clarification");
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]" style={{ textAlign: "center" }}>
            ID
          </TableHead>
          <TableHead style={{ textAlign: "center" }}>Content</TableHead>
          <TableHead style={{ textAlign: "center" }}>Assignment ID</TableHead>
          <TableHead style={{ textAlign: "center" }}>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clarifications.map((clarification) => (
          <TableRow key={clarification.id}>
            <TableCell className="w-[100px]" style={{ textAlign: "center" }}>
              {clarification.id}
            </TableCell>
            <TableCell style={{ textAlign: "center" }}>
              <Link href={`/clarifications/${clarification.id}`}>
                {clarification.text}
              </Link>
            </TableCell>
            <TableCell style={{ textAlign: "center" }}>
              {clarification.assignmentId}
            </TableCell>
            <TableCell style={{ textAlign: "center" }}>
              <DropdownMenu>
                <DropdownMenuTrigger className="inline-flex items-center">
                  Actions
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Options</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() =>
                      handleEdit(
                        clarification.id,
                        clarification.text,
                        clarification.assignmentId,
                      )
                    }
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setDeleteId(clarification.id);
                      setCurrentAssignmentId(clarification.assignmentId);
                      setIsDeleteDialogOpen(true);
                    }}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      {/* Edit Dialog */}
      <Dialog
        open={editId !== null}
        onOpenChange={() => {
          setEditId(null);
          setCurrentAssignmentId(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Clarification</DialogTitle>
            <DialogDescription>
              Edit the clarification text below:
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            rows={4}
            placeholder="Enter your text here"
          />
          <div className="flex justify-end mt-4">
            <Button
              onClick={() => {
                setEditId(null);
                setCurrentAssignmentId(null);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSave} className="ml-2">
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onOpenChange={() => setIsDeleteDialogOpen(false)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this clarification?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-4">
            <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={() => {
                if (deleteId !== null && currentAssignmentId !== null) {
                  handleDelete(deleteId, currentAssignmentId);
                  setIsDeleteDialogOpen(false);
                }
              }}
              className="ml-2"
            >
              Yes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Table>
  );
}

export default ClarificationList;
