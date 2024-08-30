import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ProblemVersion } from "@prisma/client";
import Link from "next/link";

interface ProblemVersionListProps {
  problemVersions: ProblemVersion[];
}

export function ProblemVersionList({ problemVersions }: ProblemVersionListProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Metadata</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            problemVersions.map((problemVersion) => (
              <TableRow key={problemVersion.id}>
                <TableCell>{problemVersion.name}</TableCell>
                <TableCell>{JSON.stringify(problemVersion.metadata)}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
