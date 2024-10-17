import { Permission } from "@prisma/client";
import { getPermissions } from "@/services/session/get-permissions";

export function hasPermission(
  _requires: Permission[] | Permission,
  _holding: Permission[],
) {
  const holding = _holding;
  const requires = Array.isArray(_requires) ? _requires : [_requires];
  const isAdmin = holding.includes(Permission.developAdmin);
  const result =
    isAdmin || requires.some((permission) => holding.includes(permission));
  return result;
}

export async function serverHasPermission(requires: Permission[] | Permission) {
  const holding = await getPermissions();
  return hasPermission(requires, holding);
}
