import ManagementLayout from "@/components/management-layout";
import AssignmentForm from "../assignment-form";

export default function Page() {
    return (
        <ManagementLayout title="Create Assignment">
            <AssignmentForm />
        </ManagementLayout>
    );
}
