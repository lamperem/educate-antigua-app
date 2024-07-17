/**
 * Helper auth Interfaces
 */

export interface AuthResponseDTO {
    token: string;
    details: _AuthResponseDetailsDTO
}

export interface _AuthResponseDetailsDTO {
    user_uuid: string;
    email: string;
    organizations: Array<_AuthResponseDetailsOrganizationDTO>
}

export interface _AuthResponseDetailsOrganizationDTO {
    organization_uuid: string;
    organization_name: string ;
    organization_slug: string;
    organization_status: _AuthOrganizationStatusDTO;
    is_owner: boolean

}

export interface _AuthOrganizationStatusDTO {
    status_id: number;
    status_name: string;
}