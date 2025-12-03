import ManagementLayout from "@/components/management-layout";
import AssignmentForm from "../assignment-form";
import { assertPermission } from "@/lib/error";
import { Permission } from "@prisma/client";

export default async function Page() {
  await assertPermission([Permission.createAssignment]);

  return (
    <ManagementLayout title="Create Assignment">
      <AssignmentForm />
    </ManagementLayout>
  );
}
