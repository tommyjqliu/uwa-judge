"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import downloadCSV from "@/lib/downloadCSV";
import { useToast } from "@/lib/hooks/use-toast";
import triggerUpload from "@/lib/single-upload";
import { batchUpdateUser } from "@/services/user/batch-update-user";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserOperation({
  search: initialSearch = "",
}: {
  search?: string;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState(initialSearch);

  return (
    <div className="flex justify-end gap-2">
      <Input
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        <Button
          size="icon"
          onClick={() => {
            if (search) {
              router.push(`?search=${search}`);
            } else {
              router.push(`?`);
            }
            setSearch("");
          }}
        >
          <Search className="w-4 h-4" />
        </Button>
      </div>
      <Button
        variant="secondary"
        onClick={() =>
          downloadCSV("BatchUpdateUser.csv", ["Email", "Permission"])
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
