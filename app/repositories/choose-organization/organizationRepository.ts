import { CheckOrgContextRequest, CheckOrgContextServerResponse } from "@/app/actions/choose-organization/storeOrganizationAction";
import { CookieEnum } from "@/app/enums/CookieEnum";
import { ApiErrorRes } from "@/app/utils/ApiErrorRes";
import { api } from "@/lib/api"
import { setCookie } from "@/lib/session";

export const organizationRepository = {
    choose: () => choose(),
    store: (request: CheckOrgContextRequest) => store(request)
}

const choose = async () => {
    try {
        const { data } = await api.get('/user-management/member/memberships');
        return data;
    } catch (error) {
        return ApiErrorRes(error);
    }
}

const store = async (request: CheckOrgContextRequest): Promise<ApiResponse<CheckOrgContextServerResponse>> => {
    try {
        const { data } = await api.post('/user-management/organizer/checkOrgContext', request);
        data.payload.isChecked && await setCookie(CookieEnum.ORGANIZATION_CONTEXT, request.organization_id);
        return data;
    } catch (error) {
        return ApiErrorRes(error);
    }
}