/**
 * Record internal error from judgehost
 * @param request 
 * @returns 
 */
export async function POST(request: Request) {
    console.log('request:', await request.text());
    return new Response('Not implemented', {
        status: 200,
    });
}