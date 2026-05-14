"use server";

import { organizationService } from "@/app/services/auth/vendor/organization-store-service";
import { storeOrganizationAction } from "../../choose-organization/storeOrganizationAction";

type OrgType = "vendor";

export type OrganizationStoreRequest = {
    type: OrgType,
    name: string;
    email: string;
    phone?: string;
    address?: string;
    country?: string;
    city?: string;
}

export type OrganizationServerResponse = {
    id: string;
    type: string;
    name: string;
    email: string;
    phone?: string;
}

export const OrganizationStoreAction = async (request: OrganizationStoreRequest): Promise<ApiResponse<OrganizationServerResponse>> => {
    const res = await organizationService(request);
    if(res.success){
        storeOrganizationAction(res?.payload.id)
    }
    return res;
}