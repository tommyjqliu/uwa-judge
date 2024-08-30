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
  Button
} from '@mui/material';

const assignments = [
  { id: 1, name: "Assignment 1", description: "Assignment 1 description", publishTime: "8/9/2024, 10:34:23 AM", dueTime: "8/9/2024, 10:34:23 AM" },
  { id: 2, name: "Assignment 2", description: "Assignment 2 description", publishTime: "8/9/2024, 10:34:28 AM", dueTime: "8/9/2024, 10:34:28 AM" },
  { id: 3, name: "Assignment 3", description: "Assignment 3 description", publishTime: "8/9/2024, 10:34:28 AM", dueTime: "8/9/2024, 10:34:28 AM" },
  { id: 4, name: "Assignment 4", description: "Assignment 4 description", publishTime: "8/9/2024, 10:34:28 AM", dueTime: "8/9/2024, 10:34:28 AM" },
  { id: 5, name: "Assignment 5", description: "Assignment 5 description", publishTime: "8/9/2024, 10:34:28 AM", dueTime: "8/9/2024, 10:34:28 AM" },
];

export default function AssignmentsPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Assignments
        <Button variant="contained" color="primary">Create Assignment</Button>
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="assignments table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Publish Time</TableCell>
              <TableCell>Due Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell component="th" scope="row">
                  {assignment.id}
                </TableCell>
                <TableCell>{assignment.name}</TableCell>
                <TableCell>{assignment.description}</TableCell>
                <TableCell>{assignment.publishTime}</TableCell>
                <TableCell>{assignment.dueTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}