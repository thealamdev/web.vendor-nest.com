import { createContext } from "react";
import { Membership } from "../providers/OrganizationProvier";

export type OrganizationContextResponse = {
    organizations: Membership[],
    changeOrganization: (orgId: string) => void;
}

const initialContext: OrganizationContextResponse = {
    organizations: [],
    changeOrganization: (orgId: string) => { }
}

export const OrganizationContext = createContext(initialContext);