export default function ManagementLayout({
    title: header,
    navigator,
    operation,
    children
}: {
    title: React.ReactNode;
    navigator?: React.ReactNode;
    operation?: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <main className="flex-grow h-0 flex flex-col gap-4 px-6 py-4 overflow-y-auto relative">
            <header className="flex justify-between">
                <h1 className="text-3xl font-bold">{header}</h1>
                {operation}
            </header>
            <div className="h-0 flex-1 flex gap-4">
                {navigator}
                {children}
            </div>
        </main>
    );
}