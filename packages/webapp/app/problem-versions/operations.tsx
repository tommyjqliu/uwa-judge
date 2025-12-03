"use client";
import { Button } from "@/components/ui/button";
import triggerUpload from "@/lib/single-upload";
import { deleteProblemVersion } from "@/services/problem-version/delete-problem-version";
import { uploadProblemVersion } from "@/services/problem-version/upload-problem-version";
import { Router, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { useState } from "react";

export function HeaderOperation() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex justify-end gap-2">
      <Button
        loading={loading}
        onClick={async () => {
          const fileList = await triggerUpload({
            accept: ".zip,.tar,.gz,.rar",
            multiple: true,
          });
          if (!fileList) return;
          setLoading(true);
          const formData = new FormData();
          for (const file of fileList) {
            formData.append("file", file);
          }
          await uploadProblemVersion(formData);
          setLoading(false);
          router.refresh();
        }}
      >
        Upload Problem
      </Button>
    </div>
  );
}

export function DeleteProblem({ id }: { id: number }) {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        deleteProblemVersion(id);
        router.refresh();
      }}
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  );
}
