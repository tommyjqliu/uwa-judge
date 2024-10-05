"use client";
import { Button } from "@/components/ui/button";
import triggerUpload from "@/lib/single-upload";
import { uploadProblem } from "./action";
import { useState } from "react";

export default function ProblemVersionOperation() {
    const [loading, setLoading] = useState(false);
    return (
        <div className="flex justify-end gap-2">
            <Button
                loading={loading}
                onClick={async () => {
                    const fileList = await triggerUpload({ accept: ".zip,.tar,.gz,.rar", multiple: true })
                    if (!fileList) return;
                    setLoading(true);
                    const formData = new FormData();
                    for (const file of fileList) {
                        formData.append("file", file);
                    }
                    const res = await uploadProblem(formData);
                    console.log(res);
                    setLoading(false);
                }}>
                Upload Problem
            </Button>
        </div>
    );
}