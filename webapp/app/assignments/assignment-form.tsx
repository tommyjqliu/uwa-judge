"use client";

import axios from "@/lib/axios";
import ClientContext from "@/components/client-context";
import EntitySelector from "@/components/entity-selector";
import FileUploader from "@/components/file-uploader";
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useRouter } from "next/navigation";

import { Controller, SubmitHandler, useForm } from "react-hook-form";

export default function AssignmentForm() {
  const router = useRouter();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      description: "",
      publishDate: null,
      dueDate: null,
      students: [],
      problems: [],
    },
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    await axios.postForm("/api/assignments", data);
    router.push("/assignments");
  };

  return (
    <ClientContext>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Controller
          name="title"
          control={control}
          render={({ field }) => <Textarea {...field} />}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Textarea {...field} />
          )}
        />
        <Controller
          name="publishDate"
          control={control}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker label="Publish Date" {...field} />
            </LocalizationProvider>
          )}
        />
        <Controller
          name="dueDate"
          control={control}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker label="Due Date" {...field} />
            </LocalizationProvider>
          )}
        />
        <Controller
          name="students"
          control={control}
          render={({ field }) => (
            <EntitySelector
              label="Students"
              entityQuery={{ entity: "user", action: "findMany" }}
              {...field}
              multiple
            />
          )}
        />
        <Controller
          name="problems"
          control={control}
          render={({ field }) => (
            <div>
              <div className="pb-2">Problems</div>
              <FileUploader {...field} />
            </div>
          )}
        />
        <Button type="submit">Create</Button>
      </form>
    </ClientContext>
  );
}
