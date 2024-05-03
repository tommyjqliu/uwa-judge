import { AssignmentList } from "@/app/assignments/assignment-list";
import Pagination from "@/components/pagination";
import { uwajudgeDB } from "@/lib/database-client";
import { sleep } from "@/lib/utils";
import { Box, TextField } from "@mui/material";

import Link from "next/link";
import AssginmentForm from "../assignment-form";

export default async function page() {

    return (
        <main className='p-8'>
            <h2 className='mb-4'>Create Assignment</h2>
            <AssginmentForm />
        </main>
    )
}