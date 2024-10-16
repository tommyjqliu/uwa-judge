"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
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
            <Card className="lg:w-1/4 w-full lg:max-h-none max-h-56 lg:overflow-y-auto flex-shrink-0">
                <CardHeader>
                    <CardTitle>Problems</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {problems.map((problem) => (
                            <li key={problem.id}>
                                <Button
                                    variant={selectedProblem.id === problem.id ? "default" : "outline"}
                                    className="w-full justify-start"
                                    onClick={() => setSelectedProblem(problem)}
                                >
                                    {problem.problemVersion.name}
                                </Button>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            {/* Submission display */}
            <Card className="flex-grow lg:ml-4 mt-4 lg:mt-0">
                <CardHeader>
                    <CardTitle>{selectedProblem.problemVersion.name}</CardTitle>
                </CardHeader>
                <CardContent>
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
                </CardContent>
            </Card>

            {/* Grading interface */}
            <Card className="lg:w-1/4 w-full lg:ml-4 mt-4 lg:mt-0 flex-shrink-0">
                <CardHeader>
                    <CardTitle>Grading</CardTitle>
                </CardHeader>
                <CardContent>
                    <Input
                        type="number"
                        placeholder="Grade"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        className={`mb-2 ${initialGrade ? 'bg-green-100' : ''}`}
                    />
                    <Textarea
                        placeholder="Comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className={`mb-2 ${initialComment ? 'bg-green-50' : ''}`}
                    />
                    <div className="flex items-center flex-wrap">
                        <Button
                            onClick={handleSubmitGrading}
                            disabled={!grade || isSubmitting}
                            className="mr-2 mb-1"
                        >
                            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Submit Grading"}
                        </Button>
                        {submissionStatus === "success" && (
                            <Badge variant="outline" className="bg-green-100 text-green-800 mb-1">
                                ✔ Grading Submitted
                            </Badge>
                        )}
                        {submissionStatus === "failure" && (
                            <Badge variant="outline" className="bg-red-100 text-red-800 mb-1">
                                ❌ Grading Failed
                            </Badge>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}