"use client"


import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import EntitySelector from "@/components/entity-selector"
import { getUsers } from "@/services/user/get-users"
import ClientContext from "@/components/client-context"
import { MultiSelect } from "@/components/ui/multi-select"
import FileUploader from "@/components/file-uploader"

const assignmentSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  publishDate: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional(),
});

export default function AssignmentForm() {
  const form = useForm<z.infer<typeof assignmentSchema>>({
    resolver: zodResolver(assignmentSchema),
  })

  function onSubmit(values: z.infer<typeof assignmentSchema>) {
    console.log(values)
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
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
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
                  <Input placeholder="shadcn" {...field} />
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
                  <Input type="time" {...field} />
                </FormControl>
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
                  <MultiSelect options={[{
                    value: "1",
                    label: "Student 1"
                  }]} {...field} />
                </FormControl>
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
                  <FileUploader {...field} value={[]} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </ClientContext>
  )
}
