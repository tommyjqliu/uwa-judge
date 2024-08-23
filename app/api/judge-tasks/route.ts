import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const formdata = await request.formData();
    console.log('request:', formdata);
    return new Response('Not implemented', {
        status: 200,
    });
}
