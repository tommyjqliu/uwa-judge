'use client';

import React, { useState } from 'react';
import {
    Container,
    Typography,
    Paper,
    Grid,
    TextField,
    Button,
    Box,
    Chip,
    CircularProgress,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AttachFileIcon from '@mui/icons-material/AttachFile';

// Fake data for demonstration
const studentSubmission = {
    studentName: "Alice Johnson",
    assignmentName: "Assignment 1",
    submissionTime: "2024-08-09 14:30:00",
    automaticTestsPassed: 3,
    automaticTestsTotal: 5,
    code: "function example() {\n  console.log('Hello, world!');\n}",
    attachments: [] // Empty array to represent no attachments
};

export default function StudentSubmissionGradingPage() {
    const [grade, setGrade] = useState('');
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [lastSubmissionTime, setLastSubmissionTime] = useState(null);

    const handleSubmitGrading = async () => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Submitting grade:', grade);
        console.log('Submitting comment:', comment);
        setIsSubmitting(false);
        setLastSubmissionTime(new Date().toLocaleString());
        // Here you would typically send this data to your backend
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Grading: {studentSubmission.assignmentName} - {studentSubmission.studentName}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, mb: 2 }}>
                        <Typography variant="h6" gutterBottom>Submission Details</Typography>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body1">
                                Submitted on: {studentSubmission.submissionTime}
                            </Typography>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body1">
                                Automatic Tests: {studentSubmission.automaticTestsPassed} / {studentSubmission.automaticTestsTotal} passed
                            </Typography>
                            <Chip
                                icon={studentSubmission.automaticTestsPassed === studentSubmission.automaticTestsTotal ? <CheckCircleIcon /> : <CancelIcon />}
                                label={studentSubmission.automaticTestsPassed === studentSubmission.automaticTestsTotal ? "All Tests Passed" : "Some Tests Failed"}
                                color={studentSubmission.automaticTestsPassed === studentSubmission.automaticTestsTotal ? "success" : "error"}
                                variant="outlined"
                                sx={{ mt: 1 }}
                            />
                        </Box>
                        <Typography variant="h6" gutterBottom>Submitted Code</Typography>
                        <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.100' }}>
                            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                                {studentSubmission.code}
                            </pre>
                        </Paper>
                    </Paper>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>Attachments</Typography>
                        {studentSubmission.attachments.length > 0 ? (
                            <List>
                                {studentSubmission.attachments.map((attachment, index) => (
                                    <ListItem key={index}>
                                        <ListItemIcon>
                                            <AttachFileIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={attachment.name} />
                                        <Button variant="outlined" size="small">
                                            Download
                                        </Button>
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <Typography variant="body1">No files attached</Typography>
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>Grading</Typography>
                        <TextField
                            fullWidth
                            label="Grade"
                            type="number"
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Comment"
                            multiline
                            rows={4}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmitGrading}
                                disabled={!grade || isSubmitting}
                                sx={{ mr: 2, mb: 1 }}
                            >
                                {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Submit Grading"}
                            </Button>
                            {lastSubmissionTime && (
                                <Chip
                                    icon={<CheckCircleIcon />}
                                    label={`Last submitted: ${lastSubmissionTime}`}
                                    color="success"
                                    variant="outlined"
                                    sx={{ mb: 1 }}
                                />
                            )}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}