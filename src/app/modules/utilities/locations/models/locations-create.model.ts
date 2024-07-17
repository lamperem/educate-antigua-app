import { AdmCreatedBy } from "app/core/models/AdmCreatedBy"
import { AdmOrganzationUUID } from "app/core/models/AdmOrganization"
import { AdmTypology } from "app/core/models/AdmTypology"
import { environment } from "environments/environment"

export class LocationCreateDTO {
    location_uuid: string
    created_by: AdmCreatedBy
    location: string =''
    organization: AdmOrganzationUUID
    country: AdmTypology
    state: AdmTypology
    city: AdmTypology
    address_line: string='S/D'
    latitude: string='0000000'
    longitude: string='0000000'
    status: AdmTypology

    constructor() {
        this.created_by =  new AdmCreatedBy()
        this.organization =  new AdmOrganzationUUID()
        this.country = new AdmTypology(environment.DEFAULT_EMPTY_TYPOLOGY)
        this.state = new AdmTypology(environment.DEFAULT_EMPTY_TYPOLOGY) 
        this.city =  new AdmTypology(environment.DEFAULT_EMPTY_TYPOLOGY) 
        this.status = new AdmTypology(environment.DEFAULT_STATUS_ACTIVE)
    }
  }
  