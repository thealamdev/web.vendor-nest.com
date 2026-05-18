"use client";

import { RolePermissionContext, RolePermissionResponse } from "@/app/context/RolePermissionContext";
import { usePermission } from "@/app/hooks";
import { rolePermissionService } from "@/app/services/dashboard/role-permission/role-permission-service";
import UnauthorizedComponent from "@/components/utilities/UnauthorizedComponent";
import { useQuery } from "@tanstack/react-query";
import { SplinePointerIcon } from "lucide-react";
import { useContext } from "react";

type PageProps = {
    roleId: string;
}

const fetchRoles = async (roleId: string) => {
    const res = await rolePermissionService.get(roleId);
    return res;
}

export default function UpdateRolePermissionComponent({
    roleId
}: PageProps) {
    const { roles, permissions, hasPermission } = usePermission();

    const { data, error, isPending } = useQuery({
        queryKey: ["role_permissions:all"],
        queryFn: () => fetchRoles(roleId)
    });

    const canViewRoles = hasPermission('role.view');

    if (isPending) return <SplinePointerIcon />;
    if (canViewRoles === false) return <UnauthorizedComponent />;

    if (isPending) {
        return <p>Loading...</p>
    }

    return (
        <div>
            {
                hasPermission('role.view') ? (
                    <div>
                        <pre>{JSON.stringify(data, null, 2)}</pre>
                    </div>
                ) : (
                    <UnauthorizedComponent />
                )
            }
        </div>
    )
}
