import { OrganizationServerResponse, OrganizationStoreRequest } from "@/app/actions/auth/vendor/organization-store-aciton";
import { ApiErrorRes } from "@/app/utils/ApiErrorRes";
import { api } from "@/lib/api";

export const organizationStoreRepository = async (request: OrganizationStoreRequest): Promise<ApiResponse<OrganizationServerResponse>> => {
    try {
        const { data } = await api.post<ApiResponse<OrganizationServerResponse>>('/user-management/organizer/store', request);
        return data;
    } catch (error) {
        return ApiErrorRes<OrganizationServerResponse>(error);
    }
}