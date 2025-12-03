"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ClientContext from "@/components/client-context";
import FileUploader from "@/components/file-uploader";
import { DatetimePicker } from "@/components/ui/datetime-picker";
import { Textarea } from "@/components/ui/textarea";
import toFormData from "@/lib/to-formdata";
import { createAssignmentForm } from "@/services/assignment/create-assignment-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/lib/hooks/use-toast";
import { useState } from "react";

const emailsRefine = (value: string) => {
  const emails = value.split(/[\s,]+/);
  return emails.every((email) => z.string().email().safeParse(email).success);
};

const assignmentSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional().default(""),
  publishDate: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional(),
  students: z
    .string()
    .refine(emailsRefine, { message: "Invalid email" })
    .optional(),
  tutors: z
    .string()
    .refine(emailsRefine, { message: "Invalid email" })
    .optional(),
  problems: z.array(z.instanceof(File)).optional(),
});

export default function AssignmentForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof assignmentSchema>>({
    resolver: zodResolver(assignmentSchema),
  });

  async function onSubmit(values: z.infer<typeof assignmentSchema>) {
    setLoading(true);
    try {
      const formData = toFormData(values);
      await createAssignmentForm(formData);
      toast({
        title: "Assignment created",
        description: "Assignment created successfully",
      });
      router.push("/assignments");
      router.refresh();
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: "Failed to create assignment",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <ClientContext>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="publishDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Publish Date</FormLabel>
                <FormControl>
                  <DatetimePicker
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Due Date</FormLabel>
                <FormControl>
                  <DatetimePicker
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tutors"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tutor</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription>
                  Tutor emails (comma/space separated)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="students"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Students</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription>
                  Student emails (comma/space separated)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="problems"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Problems</FormLabel>
                <FormControl>
                  <FileUploader value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" loading={loading}>
            Submit
          </Button>
        </form>
      </Form>
    </ClientContext>
  );
}
