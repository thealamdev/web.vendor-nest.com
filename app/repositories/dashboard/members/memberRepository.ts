import { MemberStoreRequest } from "@/app/actions/dashboard/members/member-store-action"
import { MemberUpdateRequest } from "@/app/actions/dashboard/members/member-update.aciton";
import { ApiErrorRes } from "@/app/utils/ApiErrorRes";
import { api } from "@/lib/api"

const store = async (request: MemberStoreRequest) => {
    try {
        const { data } = await api.post('/user-management/member/store', request);
        return data;
    } catch (error) {
        return ApiErrorRes(error)
    }
}

const update = async (MEMBER_ID: string, request: MemberUpdateRequest) => {
    try {
        const { data } = await api.put(`/user-management/member/update/${MEMBER_ID}`, request);
        return data;
    } catch (error) {
        return ApiErrorRes(error)
    }
}

export const memberRepository = {
    store: (request: MemberStoreRequest) => store(request),
    update: (MEMBER_ID: string, request: MemberUpdateRequest) => update(MEMBER_ID, request),
}