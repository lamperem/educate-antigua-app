export interface User
{
    id?: string;
    name?: string;
    email: string;
    avatar?: string;
    status?: string;
    user_uuid: string;
    organizations: Array<OrganizationToken> ;

}


export interface OrganizationToken   {
    organization_uuid: string;
    organization_name: string;
    organization_slug: string;
    organization_status: {};
    is_owner: boolean;
    active_org?: boolean;
}
