import { getSession } from "@/services/session/get-session";
import { uwajudgeDB } from "@/lib/database-client";
import { assert } from "@/lib/error";
import { $Enums, User } from "@prisma/client";

// TODO: Refactor auth into a module
export default async function refreshProfile(user?: User | null) {
  const session = await getSession();
  const { profile } = session;

  if (!user) {
    if (!profile) return;
    const { id } = profile;
    user = await uwajudgeDB.user.findUnique({
      where: {
        id,
      },
    });
    assert(user, "User not found");
  }

  const permissions = new Set<$Enums.Permission>(user.permissions);

  session.profile = {
    ...user,
    permissions: [...permissions],
  };

  await session.save();
}
