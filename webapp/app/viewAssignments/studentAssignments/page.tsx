'use client';

import React from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

// Fake data for demonstration
const assignmentName = "Assignment 1";
const studentSubmissions = [
  { id: 1, name: "Alice Johnson", submitted: true, submissionTime: "2024-08-09 14:30:00" },
  { id: 2, name: "Bob Smith", submitted: false, submissionTime: null },
  { id: 3, name: "Charlie Brown", submitted: true, submissionTime: "2024-08-08 09:15:00" },
  { id: 4, name: "Diana Ross", submitted: true, submissionTime: "2024-08-09 11:45:00" },
  { id: 5, name: "Ethan Hunt", submitted: false, submissionTime: null },
];

export default function StudentSubmissionsPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Student Submissions for {assignmentName}
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="student submissions table">
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell align="center">Submission Status</TableCell>
              <TableCell align="right">Submission Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentSubmissions.map((student) => (
              <TableRow key={student.id}>
                <TableCell component="th" scope="row">
                  {student.name}
                </TableCell>
                <TableCell align="center">
                  {student.submitted ? (
                    <Chip
                      icon={<CheckCircleIcon />}
                      label="Submitted"
                      color="success"
                      variant="outlined"
                    />
                  ) : (
                    <Chip
                      icon={<CancelIcon />}
                      label="Not Submitted"
                      color="error"
                      variant="outlined"
                    />
                  )}
                </TableCell>
                <TableCell align="right">
                  {student.submissionTime || "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}