import AssginmentForm from "../assignment-form";

export default async function page() {
  return (
    <main className="p-8">
      <h2 className="mb-4">Create Assignment</h2>
      <AssginmentForm />
    </main>
  );
}
