"use server"

import { uwajudgeDB } from "@/lib/database-client";
import { createProblemVersions } from "@/services/problem-version/create-problem-version";

export async function uploadProblem(formData: FormData) {
    const files = formData.getAll("file") as File[];
    const problemVersion = await createProblemVersions(files);
    return problemVersion.map(problemVersion => ({
        id: problemVersion.id,
        name: problemVersion.name,
    }));
}

export async function deleteProblemVersion(id: number) {
    await uwajudgeDB.problemVersion.delete({
        where: {
            id: id
        }
    });
}   