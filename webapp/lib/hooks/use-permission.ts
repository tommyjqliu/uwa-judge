import { getPermissions } from "@/services/session/get-permissions";
import { useQuery } from "@tanstack/react-query";
import { hasPermission } from "../permission";
import { Permission } from "@prisma/client";

export function usePermission() {
    const { data: permissions = [] } = useQuery({
        queryKey: ["permission"],
        queryFn: () => getPermissions(),
    });

    return {
        permissions,
        hasPermission: (requires: Permission[] | Permission) => hasPermission(requires, permissions),
    };
}