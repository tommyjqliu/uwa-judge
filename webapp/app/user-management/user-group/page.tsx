import { DataTable } from "@/components/ui/data-table";
import { uwajudgeDB } from "@/lib/database-client";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<User>[] = [{
    accessorKey: "id",
    header: "ID",
}, {
    accessorKey: "username",
    header: "Username",
}]

export default async function page() {
    const users = await uwajudgeDB.user.findMany();
    return (
        <div>
            <DataTable columns={columns} data={users} />
        </div>
    );
}