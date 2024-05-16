import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Assignment } from '@prisma/client';

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}


interface AssignmentListProps {
    assignments: Assignment[];
}

export function AssignmentList({
    assignments
}: AssignmentListProps) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="right">Start Time</TableCell>
                        <TableCell align="right">Due Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {assignments.map((assignment) => (
                        <TableRow
                            key={assignment.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {assignment.id}
                            </TableCell>
                            <TableCell align="right">{assignment.title}</TableCell>
                            <TableCell align="right">{assignment.description }</TableCell>
                            <TableCell align="right">{assignment.publishDate?.toLocaleString()}</TableCell>
                            <TableCell align="right">{assignment.dueDate?.toLocaleString() }</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}