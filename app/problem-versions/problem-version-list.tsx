import * as React from "react";
import { ProblemVersion } from "@prisma/client";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/lib/components/ui/table";

interface ProblemVersionListProps {
  problemVersions: ProblemVersion[];
}

export function ProblemVersionList({ problemVersions }: ProblemVersionListProps) {
  return (
      <Table aria-label="simple table">
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

  );
}
