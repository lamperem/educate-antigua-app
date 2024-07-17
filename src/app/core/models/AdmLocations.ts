import { AdmCreatedBy } from "./AdmCreatedBy"
import { AdmOrganization, AdmOrganzationUUID } from "./AdmOrganization"
import { AdmTypology } from "./AdmTypology"

export class AdmLocation {
    location: string
    organization: AdmOrganzationUUID
    country: AdmTypology
    state: AdmTypology
    city: AdmTypology
    address_line: string
    latitude: string
    longitude: string
    status: AdmTypology
    location_uuid: string
    created_by: AdmCreatedBy
  }