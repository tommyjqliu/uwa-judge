"use client";

import React, { useState, useEffect } from "react";
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
  Button,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";

interface Assignment {
  id: number;
  title: string;
  description: string | null;
  publishDate: string | null;
  dueDate: string | null;
}

const formatDate = (dateString: string | null): string => {
  if (!dateString) return "Not set";
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
};

export default function AssessmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch("/api/assignments");
        if (!response.ok) {
          throw new Error("Failed to fetch assignments");
        }
        const data: Assignment[] = await response.json();
        setAssignments(data);
      } catch (err) {
        setError("Failed to load assignments. Please try again later.");
        console.error("Error fetching assignments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const handleAssessmentClick = (assessmentId: number) => {
    router.push(`/assessments/${assessmentId}`);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Assessments
        <Button variant="contained" color="primary">
          Create Assessment
        </Button>
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="assessments table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Publish Date</TableCell>
              <TableCell>Due Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments.map((assignment) => (
              <TableRow
                key={assignment.id}
                onClick={() => handleAssessmentClick(assignment.id)}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                    cursor: "pointer",
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {assignment.id}
                </TableCell>
                <TableCell>{assignment.title}</TableCell>
                <TableCell>
                  {assignment.description || "No description"}
                </TableCell>
                <TableCell>{formatDate(assignment.publishDate)}</TableCell>
                <TableCell>{formatDate(assignment.dueDate)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}