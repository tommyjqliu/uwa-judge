import { getSession } from "@/lib/auth";
import { sendEmail } from "@/services/email/send-email";
import { signUpSchema } from "@/services/user/sign-up-user"
import { generateRandomString, alphabet } from "oslo/crypto";
import argon2 from "argon2";
import { uwajudgeDB } from "@/lib/database-client";
import { assert } from "console";

export async function POST(request: Request) {
    const body = await request.json();
    const { username, email, password } = signUpSchema.parse(body);

    const existedUser = await uwajudgeDB.user.findUnique({
        where: {
            email,
            active: true
        }
    });

    assert(!existedUser, "User already exists");

    const code = generateRandomString(6, alphabet("0-9"));
    await sendEmail(email, "Verify your email", `Your verification code is ${code}`);

    const codeHash = await argon2.hash(code);
    const passwordHash = await argon2.hash(password);
    const expriresAt = (new Date((new Date).getTime() + 1000 * 60 * 5)).toISOString();
    const signature = await argon2.hash(`${username}${email}${passwordHash}${codeHash}${expriresAt}`);

    const pendingSignUpRequest = {
        username,
        email,
        passwordHash,
        codeHash,
        expriresAt,
        signature
    };

    const session = await getSession();
    session.pendingSignUpRequest = pendingSignUpRequest;
    await session.save();

    return new Response(null, {
        status: 200,
    })
}