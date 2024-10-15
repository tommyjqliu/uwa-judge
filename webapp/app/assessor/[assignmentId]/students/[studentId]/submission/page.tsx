import { uwajudgeDB } from "@/lib/database-client";
import { assertNotFound } from "@/lib/error";
import ManagementLayout from "@/components/management-layout";
import ProblemTabs from "./ProblemTabs"; // Client component

export default async function Page({ params }: { params: { assignmentId: string; studentId: string } }) {
    const { assignmentId, studentId } = params;

    // Fetch all problems related to the assignment with submission filtered by studentId
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
                            dateTime: 'desc', // Assuming the latest submission is relevant
                        },
                    },
                },
            },
        },
    });

    // If no assignment is found, throw 404 error
    assertNotFound(assignment, "Assignment not found");

    return (
        <ManagementLayout title={`Submission for Student ${studentId}`}>
            <div className="w-full max-w-[1400px] mx-auto px-4">
                {/* Pass problems and studentId as props to the client-side ProblemTabs component */}
                <ProblemTabs problems={assignment.problems} studentId={studentId} />
            </div>
        </ManagementLayout>
    );
}