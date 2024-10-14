import * as React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";

import { Assignment } from "@prisma/client";
import Link from "next/link";

interface AssignmentListProps {
  assignments: Assignment[];
}

export function AssignmentList({ assignments }: AssignmentListProps) {
  return (
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Publish Time</TableCell>
            <TableCell align="right">Due Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assignments.map((assignment) => (
            <TableRow
              key={assignment.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {assignment.id}
              </TableCell>
              <TableCell align="right">
                <Link href={`code?assignmentId=${assignment.id}`}>
                  {assignment.title}
                </Link>
              </TableCell>
              <TableCell align="right">{assignment.description}</TableCell>
              <TableCell align="right">
                {assignment.publishDate?.toLocaleString()}
              </TableCell>
              <TableCell align="right">
                {assignment.dueDate?.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  );
}
