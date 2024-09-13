import UserManagementNavigator from "./navigator";

export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <div className="h-full flex flex-col p-4 overflow-hidden">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-xl font-bold py-2">User Management</h1>
                </div>
            </header>
            <div className="h-0 flex-1 flex gap-2 p-2">
                <UserManagementNavigator />
                <main className="flex-grow p-4">
                    {children}
                </main>
            </div>
        </div>
    );
}