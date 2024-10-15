"use client";

import { useState, useEffect } from "react";
import { Paper, Box, Typography, TextField, Button, Chip, CircularProgress } from "@mui/material";
import createAssessment from "@/services/assessment/create-assessment";

interface ProblemTabsProps {
    problems: any[];
    studentId: string;
    initialGrade: number | null;
    initialComment: string | null;
}

export default function ProblemTabs({ problems, studentId, initialGrade, initialComment }: ProblemTabsProps) {
    const [selectedProblem, setSelectedProblem] = useState(problems[0]);
    const [grade, setGrade] = useState(initialGrade ? initialGrade.toString() : '');
    const [comment, setComment] = useState(initialComment || '');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState<"success" | "failure" | null>(null);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    const latestSubmission = selectedProblem.submission.length > 0 ? selectedProblem.submission[0] : null;

    const formattedSubmissionTime = latestSubmission
        ? new Date(latestSubmission.dateTime).toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        })
        : null;

    const handleSubmitGrading = async () => {
        setIsSubmitting(true);
        setSubmissionStatus(null);

        try {
            const response = await createAssessment(
                selectedProblem.assignmentId,
                Number(studentId),
                Number(grade),
                comment
            );

            if (response) {
                setSubmissionStatus("success");
            }
        } catch (error) {
            console.error("Error submitting grading:", error);
            setSubmissionStatus("failure");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Avoid rendering until hydration is complete
    if (!hydrated) {
        return null;
    }

    return (
        <div className="flex flex-col lg:flex-row w-full h-full px-4 py-6 max-w-screen-2xl mx-auto">
            {/* Problem list */}
            <div className="lg:w-1/4 w-full lg:max-h-none max-h-56 lg:overflow-y-auto bg-gray-100 shadow-md rounded-lg p-4 flex-shrink-0">
                <h2 className="text-xl font-semibold mb-4">Problems</h2>
                <ul className="space-y-2">
                    {problems.map((problem) => (
                        <li key={problem.id}>
                            <button
                                className={`w-full text-left p-2 rounded-md ${selectedProblem.id === problem.id ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                                    }`}
                                onClick={() => setSelectedProblem(problem)}
                            >
                                {problem.problemVersion.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Submission display */}
            <div className="flex-grow lg:ml-4 mt-4 lg:mt-0 p-6 bg-white shadow-md rounded-lg">
                <h3 className="text-2xl font-bold mb-4">{selectedProblem.problemVersion.name}</h3>
                {latestSubmission ? (
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Latest Submission:</h4>
                        <pre className="bg-gray-100 p-4 rounded-md text-sm text-black whitespace-pre-wrap border border-gray-300 overflow-x-auto">
                            {latestSubmission.code}
                        </pre>
                        {formattedSubmissionTime && (
                            <p className="mt-2 text-sm text-gray-500">
                                <strong>Submitted at:</strong> {formattedSubmissionTime}
                            </p>
                        )}
                    </div>
                ) : (
                    <p className="text-gray-600">No submission available for this problem by the selected student.</p>
                )}
            </div>

            {/* Grading interface */}
            <div className="lg:w-1/4 w-full lg:ml-4 mt-4 lg:mt-0 flex-shrink-0">
                <Paper sx={{ p: 2, height: '100%', minHeight: '400px' }}>
                    <Typography variant="h6" gutterBottom>Grading</Typography>
                    <TextField
                        fullWidth
                        label="Grade"
                        type="number"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        sx={{
                            mb: 2,
                            backgroundColor: initialGrade ? '#ccffcc' : 'inherit',
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Comment"
                        multiline
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        sx={{
                            mb: 2,
                            backgroundColor: initialComment ? '#e6ffe6' : 'inherit',
                        }}
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
                        {submissionStatus === "success" && (
                            <Chip
                                label="✔ Grading Submitted"
                                color="success"
                                variant="outlined"
                                sx={{ mb: 1 }}
                            />
                        )}
                        {submissionStatus === "failure" && (
                            <Chip
                                label="❌ Grading Failed"
                                color="error"
                                variant="outlined"
                                sx={{ mb: 1 }}
                            />
                        )}
                    </Box>
                </Paper>
            </div>
        </div>
    );
}