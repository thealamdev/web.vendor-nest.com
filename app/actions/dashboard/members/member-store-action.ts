"use server";

import { memberRepository } from "@/app/repositories/dashboard/members/memberRepository";

export type MemberStoreRequest = {
    name: string;
    email: string;
    password: string;
    phone?: string;
    password_confirmation: string;
    role_ids: string[];
}

export const memberStoreAction = async (request: MemberStoreRequest) => {
    const res = await memberRepository.store(request);
    return res;
}