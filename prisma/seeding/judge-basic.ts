import { uwajudgeDB } from "@/lib/database-client";
import createExecutable from "@/lib/services/executable/create";
import fs from 'fs';

// Example data, adjust as necessary
const data = [
    // ID,         description,               type
    ['compare', 'default compare script', 'compare'],
    ['full_debug', 'default full debug script', 'debug'],
    ['java_javac', 'java_javac', 'compile'],
    ['run', 'default run script', 'run'],
];

export default async function main() {
    for (const [id, description, type] of data) {
        // Check if executable exists
        const existingExecutable = await uwajudgeDB.executable.findUnique({
            where: { id },
        });
        if (!existingExecutable) {
            const folderPath = `./prisma/default-language/${id}`;
            const fileNames = fs.readdirSync(folderPath);
            const filePaths = fileNames.map((file) => `${folderPath}/${file}`);

            // Create executable
            await createExecutable(id, description, type, filePaths);
        }
    }
}
