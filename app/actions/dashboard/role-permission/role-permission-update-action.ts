"use server";

import { rolePermissionService } from "@/app/services/dashboard/role-permission/role-permission-service";

export type RolePermissionUpdateRequest = {
    organization_type: "vendor";
    name: string;
    description: string;
    is_editable: boolean;
    permissions: string[]
}

export type RolePermissionServerResponse = {
    organization_type: string;
    name: string;
    slug: string;
    description: string;
    is_editable: boolean;
}

export const rolePermissionUpdateAction = async (request: RolePermissionUpdateRequest, ROLE_ID: string): Promise<ApiResponse<RolePermissionServerResponse>> => {
    const res = await rolePermissionService.update(request, ROLE_ID);
    return res;
}   