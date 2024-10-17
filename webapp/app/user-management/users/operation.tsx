"use client";
import { Button } from "@/components/ui/button";
import downloadCSV from "@/lib/downloadCSV";
import { useToast } from "@/lib/hooks/use-toast";
import triggerUpload from "@/lib/single-upload";
import { batchUpdateUser } from "@/services/user/batch-update-user";
import { useState } from "react";

export default function UserOperation() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="secondary"
        onClick={() =>
          downloadCSV("BatchUpdateUser.csv", [
            "Email",
            "Permission",
          ])
        }
      >
        Download template
      </Button>
      <Button
        loading={isLoading}
        onClick={async () => {
          const file = await triggerUpload({ accept: ".csv" });
          if (file) {
            const csvString = await file.text();
            try {
              setIsLoading(true);
              await batchUpdateUser(csvString);
              toast({
                title: "Success",
                description: "User updated successfully",
              });
            } catch (error) {
              toast({
                title: "Error",
                description: "Failed to update user",
                variant: "destructive",
              });
            } finally {
              setIsLoading(false);
            }
          }
        }}
      >
        Batch Update
      </Button>
    </div>
  );
}
