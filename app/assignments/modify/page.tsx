import { AssignmentList } from "@/app/assignments/assignment-list";
import Pagination from "@/lib/components/pagination";
import { uwajudgeDB } from "@/lib/database-client";
import { sleep } from "@/lib/utils";
import { Box, TextField } from "@mui/material";

import Link from "next/link";

export default async function page() {
  return (
    <main className="p-8">
      <h2 className="mb-4">Create Assignment</h2>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          title="title"
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
        />
      </Box>
    </main>
  );
}
