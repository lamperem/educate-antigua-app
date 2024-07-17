import { environment } from "environments/environment";
import { AdmTypology } from "./AdmTypology";
import { AdmCreatedBy } from "./AdmCreatedBy";
import { CONSTANTS } from "../constants";

export class AdmOrganization { 
    organization_uuid: string;
    created_by: AdmCreatedBy;
    organization_name: string;
    organization_slug: string;
    website: string;
    address_line_1: string;
    country: AdmTypology;
    state: AdmTypology;
    city: AdmTypology;
    currency: AdmTypology;
    organization_status: AdmTypology

    constructor() {
        this.created_by =  new AdmCreatedBy()

        this.country = new AdmTypology(environment.DEFAULT_COUNTRY_GUATEMALA)
        this.state =  new AdmTypology(environment.DEFAULT_EMPTY_TYPOLOGY)
        this.city = new AdmTypology(environment.DEFAULT_EMPTY_TYPOLOGY)
        this.organization_status =  new AdmTypology(environment.DEFAULT_STATUS_ACTIVE)
    }

}

export class AdmOrganzationUUID { 
    organization_uuid: string

    constructor() {
        this.organization_uuid =  sessionStorage.getItem(CONSTANTS.SESSION_ACTIVE_ORGANIZATION_KEY) ?? '';

    }
}
