"use client";
import { auth } from "@/lib/auth";
import { MouseEvent, useState } from "react";

export default function Page() {
  const [files, setFiles] = useState<FileList | null>(null);
  function submitForm(e: MouseEvent) {
    e.preventDefault();

    const formData = new FormData();

    for (let i = 0; i < (files?.length || 0); i++) {
      formData.append("files", files?.[i]!);
    }

    fetch("/api/problems", {
      method: "POST",
      body: formData,
    });
  }

  return (
    <form id="form">
      <div>
        <label htmlFor="files">Select files</label>
        <input
          id="files"
          type="file"
          multiple
          onChange={(e) => setFiles(e.target.files)}
        />
      </div>
      <button type="submit" onClick={(e) => submitForm(e)}>
        Upload
      </button>
    </form>
  );
}
