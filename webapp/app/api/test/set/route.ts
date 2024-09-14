import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';

export async function GET(request: Request) {
    const session = await getIronSession(cookies(), { password: "abcabcabcabcabcabcabcabcabcabcabcabcabcabc", cookieName: "abc" });
    session.username = "Alison";
    await session.save();
    console.log(session);
    return new Response(null, {
        status: 200
    });
}