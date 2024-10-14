"use client";
import { Button } from "@/components/ui/button";
import downloadCSV from "@/lib/downloadCSV";
import triggerUpload from "@/lib/single-upload";

export default function UserGroupOperation() {
  return (
    <div className="flex justify-end gap-2">
      <Button variant="secondary" onClick={() => downloadCSV("test", ["1", "2"])}>
        Download template
      </Button>
      <Button onClick={() => triggerUpload({ accept: ".csv" })}>Batch Update</Button>
    </div>
  );
}
