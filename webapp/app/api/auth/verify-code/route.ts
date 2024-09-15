import { getSession } from "@/lib/auth";
import { uwajudgeDB } from "@/lib/database-client";
import { assert } from "@/lib/error";
import errorHandler from "@/lib/error-handler";
import refreshProfile from "@/services/user/refresh-profile";
import argon2 from "argon2";

export const POST = errorHandler(
    async (request: Request) => {
        const body = await request.json()
        const code = body.code;
        const session = await getSession();
        const { pendingSignUpRequest } = session;
        assert(code && pendingSignUpRequest);
        const {
            username,
            email,
            passwordHash,
            codeHash,
            expriresAt,
            signature
        } = pendingSignUpRequest;
        assert(await argon2.verify(signature, `${username}${email}${passwordHash}${codeHash}${expriresAt}`));
        assert(new Date(expriresAt) > new Date());
        assert(await argon2.verify(codeHash, code));

        const existedUser = await uwajudgeDB.user.findUnique({
            where: {
                email,
                active: true
            }
        });

        assert(!existedUser, "User already exists");

        const user = await uwajudgeDB.user.upsert({
            where: {
                email
            },
            update: {
                email,
                username,
                password: passwordHash,
                active: true
            },
            create: {
                email,
                username,
                password: passwordHash,
                active: true
            },
            include: {
                groups: true
            }
        });

        session.pendingSignUpRequest = undefined;
        await session.save();
        await refreshProfile(user);

        return new Response(JSON.stringify({
            id: user.id,
        }), {
            status: 200,
        })
    }
)