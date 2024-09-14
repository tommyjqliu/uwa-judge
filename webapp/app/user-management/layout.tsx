import UserManagementNavigator from "./navigator";

export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <main className="flex-grow h-0 flex flex-col gap-4 px-8 py-4 overflow-hidden">
            <header>
                <h1 className="text-xl font-bold">User Management</h1>
            </header>
            <div className="h-0 flex-1 flex gap-4">
                <UserManagementNavigator />
                {children}
            </div>
        </main>
    );
}