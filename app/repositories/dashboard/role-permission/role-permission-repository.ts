import { RolePermissionRequest, RolePermissionServerResponse } from "@/app/actions/dashboard/role-permission/role-permission-store-aciton";
import { PermissionGroupByModuleResponse, RolePermissionGetResponse } from "@/app/services/dashboard/role-permission/role-permission-service";
import { ApiErrorRes } from "@/app/utils/ApiErrorRes";
import { api } from "@/lib/api"

const get = async (ROLE_ID: string): Promise<ApiResponse<RolePermissionGetResponse>> => {
    try {
        const { data } = await api.get(`/user-management/permissions/get/${ROLE_ID}`);
        return data;
    } catch (error) {
        return ApiErrorRes(error)
    }
}

const permissionsGroupByModule = async (): Promise<ApiResponse<PermissionGroupByModuleResponse>> => {
    try {
        const { data } = await api.get(`/user-management/permissions/permissionsGroupByModule`);
        return data;
    } catch (error) {
        return ApiErrorRes(error)
    }
}

const store = async (request: RolePermissionRequest): Promise<ApiResponse<RolePermissionServerResponse>> => {
    try {
        const { data } = await api.post("/user-management/role/store", request);
        return data;
    } catch (error) {
        return ApiErrorRes(error)
    }
}

export const rolePermissionRepository = {
    get: (ROLE_ID: string) => get(ROLE_ID),
    permissionsGroupByModule: () => permissionsGroupByModule(),
    store: (request: any) => store(request)
}