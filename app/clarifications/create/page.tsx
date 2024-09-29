
import ClarificationForm from "../clarificationform";
import { uwajudgeDB } from "@/lib/database-client";
export default async function page() {

  const allAssignments = await uwajudgeDB.assignment.findMany();
  return (
    <main className="p-8">
      <h2 className="mb-4">Create Clarfication</h2>
      <ClarificationForm initialAssignments={allAssignments} />
    </main>
  );
}
/*
export default function page() {
    return (
      <main className="p-8">
        <h2 className="mb-4">Hello World</h2>
      </main>
    );
  }
           <ClarficationForm />  
  */