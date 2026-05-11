import { workspaceRepository } from "@/app/repositories/choose-workspace/workspaceRepository"

export const chooseWorkspaceService = async () => {
    const res = await workspaceRepository.choose();
    return res;
}

export const storeWorkspaceService = async (orgId: string) => {
    const res = await workspaceRepository.store(orgId);
    return res;
}