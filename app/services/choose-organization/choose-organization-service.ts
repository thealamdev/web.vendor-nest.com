import { CheckOrgContextRequest, CheckOrgContextServerResponse } from "@/app/actions/choose-organization/storeOrganizationAction";
import { organizationRepository } from "@/app/repositories/choose-organization/organizationRepository";

export const chooseWorkspaceService = async () => {
    const res = await organizationRepository.choose();
    return res;
}

export const storeOrganizationService = async (request: CheckOrgContextRequest):Promise<ApiResponse<CheckOrgContextServerResponse>> => {
    const res = await organizationRepository.store(request);
    return res;
}