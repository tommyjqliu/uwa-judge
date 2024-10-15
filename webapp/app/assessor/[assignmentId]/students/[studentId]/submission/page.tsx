import { uwajudgeDB } from "@/lib/database-client";
import { assertNotFound } from "@/lib/error";
import ManagementLayout from "@/components/management-layout";
import ProblemTabs from "./ProblemTabs"; // Client component
import getAssessment from "@/services/assessment/get-assessments";

export default async function Page({ params }: { params: { assignmentId: string; studentId: string } }) {
    const { assignmentId, studentId } = params;

    // Fetch assignment with problems and student's submissions
    const assignment = await uwajudgeDB.assignment.findUnique({
        where: { id: +assignmentId },
        include: {
            problems: {
                include: {
                    problemVersion: true,
                    submission: {
                        where: {
                            userId: +studentId,
                        },
                        orderBy: {
                            dateTime: 'desc', // Get the latest submission
                        },
                    },
                },
            },
        },
    });

    // Throw 404 if assignment not found
    assertNotFound(assignment, "Assignment not found");

    // Get existing assessment data
    const assessment = await getAssessment(+assignmentId, +studentId);

    // Pre-fill grade and comment if they exist
    const initialGrade = assessment?.mark || null;
    const initialComment = assessment?.comment || null;

    return (
        <ManagementLayout title={`Submission for Student ${studentId}`}>
            <div className="w-full max-w-[1400px] mx-auto px-4">
                <ProblemTabs
                    problems={assignment.problems}
                    studentId={studentId}
                    initialGrade={initialGrade}
                    initialComment={initialComment}
                />
            </div>
        </ManagementLayout>
    );
}