"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button"; // Import custom Button component
import { Textarea } from "@/components/ui/textarea"; // Import custom Textarea component
import EntitySelector from "@/components/entity-selector"; // Import EntitySelector component
import ClientContext from "@/components/client-context"; // Import ClientContext
import getAssignments from "@/services/assignment/get-assignments";

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
export default function ClarificationForm({
  initialAssignments,
}: {
  initialAssignments: Assignment[];
}) {
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
      const response = await fetch(
        `/api/assignments/${assignmentId}/clarification`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: data.text }), // Only send the clarification text
        },
      );

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
    <ClientContext>
      {" "}
      {/* Wrap everything in ClientContext */}
      <div>
        {/*<h2>Create Clarification</h2>*/}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Select Assignment */}
          <Controller
            name="assignmentId"
            control={control}
            render={({ field }) => (
              <EntitySelector
                label="Select Assignment"
                queryAction={getAssignments}
              />
            )}
          />

          {/* Input Clarification Text */}
          <div>
            <label htmlFor="clarification-text">Clarification Text</label>
            <Controller
              name="text"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="clarification-text"
                  className="text-lg" // Set larger text size
                  rows={2} //
                  {...field}
                />
              )}
            />
          </div>

          {/* Submit Button */}
          <Button type="submit">Create Clarification</Button>
        </form>
      </div>
    </ClientContext>
  );
}
