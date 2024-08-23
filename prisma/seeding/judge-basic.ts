import { uwajudgeDB } from "@/lib/database-client";
import { isExecutable } from "@/lib/utils";
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
            const files = filePaths.map((file) => fs.readFileSync(file));

            // Create executable
            await uwajudgeDB.executable.create({
                data: {
                    id: id,
                    description,
                    type,
                    files: {
                        create: files.map((file, index) => ({
                            name: fileNames[index],
                            content: file,
                            isExecutable: isExecutable(filePaths[index]) || ['compile', 'run'].includes(fileNames[index]),
                        })),
                    },
                },
            });

            console.log(`Executable ${id} created`);

        }
    }
}
