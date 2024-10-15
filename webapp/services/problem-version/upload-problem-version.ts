"use server"

import { createProblemVersions } from "@/services/problem-version/create-problem-version";

export async function uploadProblemVersion(formData: FormData) {
    const files = formData.getAll("file") as File[];
    const problemVersion = await createProblemVersions(files);
    return problemVersion.map(problemVersion => ({
        id: problemVersion.id,
        name: problemVersion.name,
    }));
}