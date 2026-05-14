import { organizationRepository } from "@/app/repositories/choose-organization/organizationRepository";

export const chooseWorkspaceService = async () => {
    const res = await organizationRepository.choose();
    return res;
}

export const storeOrganizationService = async (orgId: string) => {
    const res = await organizationRepository.store(orgId);
    return res;
}