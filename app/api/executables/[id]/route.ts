// pages/api/getFiles.ts

import { uwajudgeDB } from '@/lib/database-client';
import { type NextRequest } from 'next/server';


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    console.log(id)
    try {
        const files = await uwajudgeDB.executableFile.findMany({
            where: { executableId: id },
        });
        const result = files.map((file) => ({
            filename: file.name,
            content: file.content.toString('base64'), // Replace with actual encoding if needed
            is_executable: file.isExecutable,
        }));
    
        console.log('result:', result);
    
        return new Response(JSON.stringify(result), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    
    } catch (error: any) {
        return new Response(error?.message, {
            status: 500,
        });
    }
}
