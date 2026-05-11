import { CookieEnum } from "@/app/enums/CookieEnum";
import { api } from "@/lib/api"
import { setCookie } from "@/lib/session";

export const workspaceRepository = {
    choose: () => choose(),
    store: (orgId: string) => store(orgId)
}

const choose = async () => {
    try {
        const { data } = await api.get('/user-management/member/getAll');
        return data;
    } catch (error) {
        throw Error(`Got error ${error}`)
    }
}

const store = async (orgId: string) => {
    const res = await setCookie(CookieEnum.ORGANIZATION_CONTEXT, orgId);
    if (res) {
        return {
            success: true
        }
    }
}