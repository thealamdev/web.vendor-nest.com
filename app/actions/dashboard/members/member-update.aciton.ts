"use server";

import { memberRepository } from "@/app/repositories/dashboard/members/memberRepository";

export type MemberUpdateRequest = {
    role_ids: string[];
}

export const memberUpdateAction = async (MEMBER_ID: string, request: MemberUpdateRequest) => {
    const res = await memberRepository.update(MEMBER_ID, request);
    return res;
}