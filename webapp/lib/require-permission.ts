
import { $Enums } from "@prisma/client";

export default async function requirePermission(
  _requires: $Enums.Permission[] | $Enums.Permission,
) {
  throw new Error("Not Implemented");
  // const requires = Array.isArray(_requires) ? _requires : [_requires];
  // const permissions = await getPermission();
  // const hasPermission = requires.every((permission) =>
  //   permissions.includes(permission),
  // );

  // if (!hasPermission) {
  //   throw new PermissionError("Permission Denied 111");
  // }
}
