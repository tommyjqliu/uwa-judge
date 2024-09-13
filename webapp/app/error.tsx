"use client"; // Error components must be Client Components

import { isErr, PermissionError } from "@/lib/error";
import { useEffect, useState } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [message, setMessage] = useState("Something went wrong!");
  useEffect(() => {
    if (isErr(error, PermissionError)) {
      setMessage("You do not have permission to view this page.");
    }
  }, [error]);


  return (
    <div>
      <h2>{message}</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
