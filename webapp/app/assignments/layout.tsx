import ManagementLayout from "@/components/management-layout";

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode
}) {
    return <ManagementLayout title="Assignments">{children}</ManagementLayout>;
}