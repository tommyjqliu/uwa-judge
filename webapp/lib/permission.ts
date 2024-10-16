import { getClientSession } from "@/components/session-injector";
import { Permission } from "@prisma/client";
import { getPermissions } from "@/services/session/get-permissions";

export function hasPermission(_requires: Permission[] | Permission, _holding: Permission[]) {
    const holding = _holding;
    const requires = Array.isArray(_requires) ? _requires : [_requires];
    const isAdmin = holding.includes(Permission.developAdmin);
    const result = isAdmin || requires.some(permission => holding.includes(permission));
    return result;
}

export async function serverHasPermission(requires: Permission[] | Permission) {
    const holding = await getPermissions();
    return hasPermission(requires, holding);
}

export function clientHasPermission(requires: Permission[] | Permission) {
    // assert(typeof window !== "undefined", "This function can only be called in client");
    if (typeof window === "undefined") return false;
    const session = getClientSession();
    console.log(session);
    const holding = session?.profile?.permissions || [];
    return hasPermission(requires, holding);
}