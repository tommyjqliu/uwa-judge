import { signUpSchema } from "@/services/user/sign-up-user"
import argon2 from "argon2";
import { uwajudgeDB } from "@/lib/database-client";
import { assert } from "@/lib/error";
import refreshProfile from "@/services/user/refresh-profile";


export async function POST(request: Request) {
    const body = await request.json();
    const { email, password } = signUpSchema.parse(body);
    const user = await uwajudgeDB.user.findUnique({
        where: {
            email
        },
        include: {
            groups: true
        }
    });

    assert(user && user.password);
    assert(await argon2.verify(user.password, password));
    await refreshProfile(user);

    return new Response(null, {
        status: 200,
    })
}