"use client"; // Error components must be Client Components

import { isErr, ErrorType } from "@/lib/error";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [message, setMessage] = useState("An unexpected error occurred.");
  const [description, setDescription] = useState(
    "We're sorry for the inconvenience. Our team has been notified and is working on a solution.",
  );

  useEffect(() => {
    if (isErr(error, ErrorType.PermissionError)) {
      setMessage("Access Denied");
      setDescription(error.message);
    } else if (isErr(error, ErrorType.NotFoundError)) {
      setMessage("Page Not Found");
      setDescription(error.message);
    } else if (isErr(error, ErrorType.ParamsInvalidError)) {
      setMessage("Invalid Parameters");
      setDescription(error.message);
    }
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md text-center">
        <AlertCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{message}</h1>
        <p className="text-gray-600 mb-6">{description}</p>
        <Button
          onClick={() => reset()}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      </div>
    </div>
  );
}
