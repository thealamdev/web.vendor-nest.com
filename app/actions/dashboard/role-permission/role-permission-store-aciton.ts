"use server";

import { rolePermissionService } from "@/app/services/dashboard/role-permission/role-permission-service";

export type RolePermissionRequest = {
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

export const rolePermissionStoreAction = async (request: RolePermissionRequest): Promise<ApiResponse<RolePermissionServerResponse>> => {
    const res = await rolePermissionService.store(request);
    return res;
}   