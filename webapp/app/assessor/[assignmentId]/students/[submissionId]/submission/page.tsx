'use client';

import React, { useState, useEffect } from 'react';
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
import { useRouter } from 'next/router';

export default function StudentSubmissionGradingPage() {
    const [submissionData, setSubmissionData] = useState(null);
    const [grade, setGrade] = useState('');
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [lastSubmissionTime, setLastSubmissionTime] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const { submissionId, assignmentId } = router.query;  // Get submissionId and assignmentId from URL

    // Fetch submission data based on submissionId
    useEffect(() => {
        const fetchSubmissionData = async () => {
            if (!submissionId) return;

            try {
                const response = await fetch(`/api/submissions/${submissionId}`);
                if (!response.ok) {
                    throw new Error(`Error fetching submission: ${response.statusText}`);
                }
                const data = await response.json();
                setSubmissionData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching submission data:', error);
                setLoading(false);
            }
        };

        fetchSubmissionData();
    }, [submissionId]);

    const handleSubmitGrading = async () => {
        if (!grade || !comment) {
            return; // Prevent submitting if grade or comment is missing
        }

        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append('comment', comment);
            formData.append('mark', grade);

            const response = await fetch(`/api/submissions/${submissionId}`, {
                method: 'PUT',
                body: formData,  // Send formData since API expects it
            });

            if (!response.ok) {
                throw new Error(`Failed to submit grading: ${response.statusText}`);
            }

            const updatedSubmission = await response.json();
            console.log('Submission updated successfully:', updatedSubmission);

            // Optionally, you can update the UI with the new submission data.
            setLastSubmissionTime(new Date().toLocaleString());
        } catch (error) {
            console.error('Error submitting grading:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (!submissionData) {
        return <Typography variant="h6">Submission not found.</Typography>;
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Grading: {submissionData.assignmentName} - {submissionData.studentName}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, mb: 2 }}>
                        <Typography variant="h6" gutterBottom>Submission Details</Typography>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body1">
                                Submitted on: {submissionData.submissionTime}
                            </Typography>
                        </Box>
                        <Typography variant="h6" gutterBottom>Submitted Code</Typography>
                        <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.100' }}>
                            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                                {submissionData.code}
                            </pre>
                        </Paper>
                    </Paper>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>Attachments</Typography>
                        {submissionData.attachments.length > 0 ? (
                            <List>
                                {submissionData.attachments.map((attachment, index) => (
                                    <ListItem key={index}>
                                        <ListItemIcon>
                                            📎
                                        </ListItemIcon>
                                        <ListItemText primary={attachment} />
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
                                    label={`✔ Last submitted: ${lastSubmissionTime}`}
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
