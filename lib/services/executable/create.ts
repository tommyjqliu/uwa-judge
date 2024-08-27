import { uwajudgeDB } from '@/lib/database-client';
import { isExecutable } from '@/lib/utils';
import fs from 'fs';
import path from 'path';

export default async function createExecutable(id: string, description: string, type: string, filePaths: string[]) {
    const files = filePaths.map((file) => fs.readFileSync(file));
    const fileNames = filePaths.map((file) => path.basename(file));

    return uwajudgeDB.executable.create({
        data: {
            id,
            description,
            type,
            files: {
                create: files.map((file, index) => ({
                    name: fileNames[index],
                    content: file,
                    isExecutable: isExecutable(filePaths[index]) || ['build', 'run'].includes(fileNames[index]),
                })),
            },
        },
    });
}