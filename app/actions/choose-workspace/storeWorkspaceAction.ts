"use server";

import { storeWorkspaceService } from "@/app/services/choose-workspace/choose-workspace-service";


export const storeWorkspaceAction = async (orgId: string) => {
    return await storeWorkspaceService(orgId);
}