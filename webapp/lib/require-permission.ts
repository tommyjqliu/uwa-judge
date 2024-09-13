import getPermission from "@/services/user/get-permission";
import { $Enums } from "@prisma/client";
import { PermissionError } from "./error";

export default async function requirePermission(_requires: $Enums.Permission[] | $Enums.Permission) {
    const requires = Array.isArray(_requires) ? _requires : [_requires];
    const permissions = await getPermission();
    const hasPermission = requires.every((permission) => permissions.includes(permission));

    if (!hasPermission) {
        throw new PermissionError("Permission Denied 111");
    }
}