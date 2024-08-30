import { uwajudgeDB } from "@/lib/database-client";
import { ProblemVersionList } from "./problem-version-list";

export default async function Page() {
  const problemVersions = await uwajudgeDB.problemVersion.findMany();

  return (
    <div>
      <ProblemVersionList problemVersions={problemVersions} />
    </div>
  );
}
