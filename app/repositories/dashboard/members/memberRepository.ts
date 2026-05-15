import { MemberStoreRequest } from "@/app/actions/dashboard/members/member-store-action"
import { api } from "@/lib/api"

const store = async (request: MemberStoreRequest) => {
    const { data } = await api.post('/user-management/member/store', request);
    return data;
}

export const memberRepository = {
    store: (request: MemberStoreRequest) => store(request)
}