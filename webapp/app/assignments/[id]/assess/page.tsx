import { uwajudgeDB } from "@/lib/database-client";
import { assertNotFound } from "@/lib/error";
import ManagementLayout from "@/components/management-layout";
import Link from "next/link";
import getAssessment from "@/services/assessment/get-assessments";

export default async function Page({ params }: { params: { id: string } }) {
    const { id: assignmentId } = params;

    // Fetch assignment data with related entities
    const assignment = await uwajudgeDB.assignment.findUnique({
        where: { id: +assignmentId },
        include: {
            students: {
                include: {
                    user: {
                        include: {
                            submission: {
                                where: {
                                    problem: {
                                        assignmentId: +assignmentId
                                    }
                                }
                            }
                        }
                    }
                }
            },
            admins: {
                include: {
                    user: true
                }
            },
            tutors: {
                include: {
                    user: true
                }
            }
        }
    });

    assertNotFound(assignment, "Assignment not found");

    // Fetch assessments for each student
    const studentGrades = await Promise.all(
        assignment.students.map(async (studentAssignment) => {
            const assessment = await getAssessment(+assignmentId, studentAssignment.user.id);
            return {
                studentId: studentAssignment.user.id,
                mark: assessment?.mark || null,
            };
        })
    );

    return (
        <ManagementLayout title={`Students for Assignment`}>
            <div className="container mx-auto px-4 py-6 max-w-screen-xl">
                {/* Title Section */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-center">{assignment.title}</h1>
                </div>

                {/* Info Section */}
                <div className="bg-gray-50 shadow-md rounded-lg p-6 mb-6">
                    <div className="lg:flex lg:justify-between lg:items-start">
                        {/* Assignment Details */}
                        <div className="lg:w-3/4">
                            <h2 className="text-2xl font-semibold mb-4">Info</h2>
                            <div className="text-gray-700 mb-4">
                                <p>
                                    <strong>Publish Date:</strong> {assignment.publishDate ? new Date(assignment.publishDate).toLocaleString() : 'Not set'}
                                </p>
                                <p>
                                    <strong>Due Date:</strong> {assignment.dueDate ? new Date(assignment.dueDate).toLocaleString() : 'Not set'}
                                </p>
                            </div>
                            {assignment.description && (
                                <p className="text-lg text-gray-700">{assignment.description}</p>
                            )}
                        </div>

                        {/* Admins and Tutors */}
                        <div className="bg-gray-100 shadow-inner rounded-lg p-4 lg:w-1/4 lg:ml-4">
                            <div className="mb-4">
                                <strong>Admins:</strong>
                                {assignment.admins.length > 0 ? (
                                    <ul className="list-disc list-inside">
                                        {assignment.admins.map((adminAssignment) => (
                                            <li key={adminAssignment.user.id}>
                                                {adminAssignment.user.username || adminAssignment.user.email}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-600">No admins assigned</p>
                                )}
                            </div>
                            <div>
                                <strong>Tutors:</strong>
                                {assignment.tutors.length > 0 ? (
                                    <ul className="list-disc list-inside">
                                        {assignment.tutors.map((tutorAssignment) => (
                                            <li key={tutorAssignment.user.id}>
                                                {tutorAssignment.user.username || tutorAssignment.user.email}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-600">No tutors assigned</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Students Table */}
                <h2 className="text-2xl font-semibold mb-6 text-left">Assigned Students</h2>
                {assignment.students.length === 0 ? (
                    <p className="text-center text-gray-600">No students assigned to this assignment.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto bg-white shadow-md rounded-lg border border-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="py-3 px-4 text-left text-gray-600 font-medium border-b">Username</th>
                                    <th className="py-3 px-4 text-left text-gray-600 font-medium border-b">Email</th>
                                    <th className="py-3 px-4 text-left text-gray-600 font-medium border-b">Submission Time</th>
                                    <th className="py-3 px-4 text-center text-gray-600 font-medium border-b">Graded</th>
                                    <th className="py-3 px-4 text-left text-gray-600 font-medium border-b">Grade</th>
                                    <th className="py-3 px-4 text-center text-gray-600 font-medium border-b">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assignment.students.map((studentAssignment) => {
                                    const submissions = studentAssignment.user.submission;
                                    const hasSubmission = submissions.length > 0;
                                    const submission = hasSubmission ? submissions[0] : null;
                                    const studentGrade = studentGrades.find(grade => grade.studentId === studentAssignment.user.id)?.mark;
                                    const assessment = studentGrades.find(grade => grade.studentId === studentAssignment.user.id);
                                    const isGraded = assessment?.mark !== null;
                                    const submissionTime = submission ? new Date(submission.dateTime).toLocaleString() : "";
                                    const grade = studentGrade !== null ? studentGrade : "N/A";

                                    return (
                                        <tr key={studentAssignment.user.id} className="hover:bg-gray-50">
                                            <td className="py-3 px-4 border-b text-gray-700">
                                                {studentAssignment.user.username || "No username"}
                                            </td>
                                            <td className="py-3 px-4 border-b text-gray-700">
                                                {studentAssignment.user.email}
                                            </td>
                                            <td className="py-3 px-4 border-b text-gray-700">
                                                {submissionTime || "No submission"}
                                            </td>
                                            <td className="py-3 px-4 border-b text-center text-gray-700">
                                                {isGraded ? (
                                                    <span className="text-green-600 text-lg">✔️</span>
                                                ) : (
                                                    <span className="text-red-600 text-lg">❌</span>
                                                )}
                                            </td>
                                            <td className="py-3 px-4 border-b text-gray-700">
                                                {grade}
                                            </td>
                                            <td className="py-3 px-4 border-b text-center">
                                                <Link href={`/assessor/${assignmentId}/students/${studentAssignment.user.id}/submission`}>
                                                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                                        Grade
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </ManagementLayout>
    );
}