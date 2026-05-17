import { MemberStoreRequest } from "@/app/actions/dashboard/members/member-store-action"
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

export const memberRepository = {
    store: (request: MemberStoreRequest) => store(request)
}