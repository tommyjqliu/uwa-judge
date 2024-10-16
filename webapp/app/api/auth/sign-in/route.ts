import { signInSchema, signUpSchema } from "@/services/user/sign-up-user";
import argon2 from "@node-rs/argon2";
import { uwajudgeDB } from "@/lib/database-client";
import { assert } from "@/lib/error";
import refreshProfile from "@/services/session/refresh-session";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = signInSchema.parse(body);
  const user = await uwajudgeDB.user.findUnique({
    where: {
      email,
      active: true,
    },
    include: {
      groups: true,
    },
  });

  assert(user && user.password);
  assert(await argon2.verify(user.password, password));
  await refreshProfile(user);

  return new Response(null, {
    status: 200,
  });
}
