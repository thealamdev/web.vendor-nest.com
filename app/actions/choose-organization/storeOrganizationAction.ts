"use server";

import { storeOrganizationService } from "@/app/services/choose-organization/choose-organization-service";

export type CheckOrgContextRequest = {
    organization_id: string;
}

export type CheckOrgContextServerResponse = {
    isChecked: boolean
}

export const storeOrganizationAction = async (request: CheckOrgContextRequest):Promise<ApiResponse<CheckOrgContextServerResponse>> => {
    return await storeOrganizationService(request);
}