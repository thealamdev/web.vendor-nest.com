import { RolePermissionRequest, RolePermissionServerResponse } from "@/app/actions/dashboard/role-permission/role-permission-store-aciton";
import { ApiErrorRes } from "@/app/utils/ApiErrorRes";
import { api } from "@/lib/api"

const store = async (request: RolePermissionRequest): Promise<ApiResponse<RolePermissionServerResponse>> => {
    try {
        const { data } = await api.post("/user-management/role/store", request);
        return data;
    } catch (error) {
        return ApiErrorRes(error)
    }
}

export const rolePermissionRepository = {
    store: (request: any) => store(request)
}