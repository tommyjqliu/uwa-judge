"use client";
import { Button } from "@/components/ui/button";
import downloadCSV from "@/lib/downloadCSV";
import singleUpload from "@/lib/single-upload";

export default function UserOperation() {
  return (
    <div className="mb-2 flex justify-end gap-2">
      <Button variant="secondary" onClick={() => downloadCSV("test", ["1", "2"])}>
        Download template
      </Button>
      <Button onClick={() => singleUpload()}>Batch Update</Button>
    </div>
  );
}
