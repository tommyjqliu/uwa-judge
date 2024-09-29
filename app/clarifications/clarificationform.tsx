"use client";

import { Button, TextField, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Define the interface type for Assignment
interface Assignment {
  id: number;
  title: string;
  description: string | null;
  publishDate: Date | null;
  dueDate: Date | null;
}

// Define the initial state for the Clarification form
interface ClarificationFormInput {
  assignmentId: number;
  text: string;
}

// Accept initialAssignments as props
export default function ClarificationForm({ initialAssignments }: { initialAssignments: Assignment[] }) {
  const [assignments] = useState<Assignment[]>(initialAssignments); // Initialize assignments with data from the server
  const { control, handleSubmit } = useForm<ClarificationFormInput>({
    defaultValues: {
      assignmentId: 0, // Default to no assignment selected
      text: "", // Default text is empty
    },
  });
  const router = useRouter();

  // Submit the Clarification form
  const onSubmit: SubmitHandler<ClarificationFormInput> = async (data) => {
    try {
      // Dynamically generate the API path including assignmentId
      const assignmentId = data.assignmentId;
      const response = await fetch(`/api/assignments/${assignmentId}/clarification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: data.text }), // Only send the clarification text
      });

      if (response.ok) {
        router.refresh(); // Refresh data before navigating
        router.push("/clarifications"); // Navigate to the clarifications page after success
      } else {
        console.error("Failed to submit clarification:", await response.text());
      }
    } catch (error) {
      console.error("Error submitting clarification:", error);
    }
  };

  return (
    <div>
      <h2>Create Clarification</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Select Assignment */}
        <FormControl fullWidth>
          <InputLabel id="assignment-label">Select Assignment</InputLabel>
          <Controller
            name="assignmentId"
            control={control}
            render={({ field }) => (
              <Select labelId="assignment-label" label="Select Assignment" {...field}>
                {assignments.map((assignment) => (
                  <MenuItem key={assignment.id} value={assignment.id}>
                    {assignment.title}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        {/* Input Clarification Text */}
        <Controller
          name="text"
          control={control}
          render={({ field }) => <TextField label="Clarification Text" multiline {...field} />}
        />

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary">
          Create Clarification
        </Button>
      </form>
    </div>
  );
}
