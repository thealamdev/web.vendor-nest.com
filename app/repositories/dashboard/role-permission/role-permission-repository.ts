import { RolePermissionRequest, RolePermissionServerResponse } from "@/app/actions/dashboard/role-permission/role-permission-store-aciton";
import { api } from "@/lib/api"

const store = async (request: RolePermissionRequest): Promise<ApiResponse<RolePermissionServerResponse>> => {
    const { data } = await api.post("/user-management/role/store", request);
    return data;
}

export const rolePermissionRepository = {
    store: (request: any) => store(request)
}