"use server";

import { storeOrganizationService } from "@/app/services/choose-organization/choose-organization-service";


export const storeOrganizationAction = async (orgId: string) => {
    return await storeOrganizationService(orgId);
}