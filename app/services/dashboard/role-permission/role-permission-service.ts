import { RolePermissionRequest, RolePermissionServerResponse } from "@/app/actions/dashboard/role-permission/role-permission-store-aciton"
import { rolePermissionRepository } from "@/app/repositories/dashboard/role-permission/role-permission-repository"

const store = async(request:RolePermissionRequest):Promise<ApiResponse<RolePermissionServerResponse>> => {
    const res = await rolePermissionRepository.store(request);
    return res;
}

export const rolePermissionService = {
    store: (request:RolePermissionRequest) => store(request)
}