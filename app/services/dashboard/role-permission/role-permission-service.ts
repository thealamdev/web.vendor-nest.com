import { RolePermissionRequest, RolePermissionServerResponse } from "@/app/actions/dashboard/role-permission/role-permission-store-aciton"
import { RolePermissionUpdateRequest } from "@/app/actions/dashboard/role-permission/role-permission-update-action";
import { rolePermissionRepository } from "@/app/repositories/dashboard/role-permission/role-permission-repository"

export type RolePermissionGetResponse = {
    name: string;
    slug: string;
    permissions: string[]
}

export type PermissionGroupByModuleResponse = Record<string, string[]>

const get = async (ROLE_ID: string): Promise<ApiResponse<RolePermissionGetResponse>> => {
    const res = await rolePermissionRepository.get(ROLE_ID);
    return res;
}

const permissionsGroupByModule = async (): Promise<ApiResponse<PermissionGroupByModuleResponse>> => {
    const res = await rolePermissionRepository.permissionsGroupByModule();
    return res;
}

const store = async (request: RolePermissionRequest): Promise<ApiResponse<RolePermissionServerResponse>> => {
    const res = await rolePermissionRepository.store(request);
    return res;
}

const update = async (request: RolePermissionUpdateRequest, ROLE_ID: string): Promise<ApiResponse<RolePermissionServerResponse>> => {
    const res = await rolePermissionRepository.update(request, ROLE_ID);
    return res;
}

export const rolePermissionService = {
    get: (ROLE_ID: string) => get(ROLE_ID),
    permissionsGroupByModule: () => permissionsGroupByModule(),
    update: (request: RolePermissionUpdateRequest, ROLE_ID: string) => update(request, ROLE_ID),
}