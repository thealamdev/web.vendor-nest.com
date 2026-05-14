import { OrganizationServerResponse, OrganizationStoreRequest } from "@/app/actions/auth/vendor/organization-store-aciton";
import { organizationStoreRepository } from "@/app/repositories/auth/vendor/organizationStoreRepository";

export const organizationService = async (data: OrganizationStoreRequest): Promise<ApiResponse<OrganizationServerResponse>> => {
    const res = await organizationStoreRepository(data);
    return res;
}