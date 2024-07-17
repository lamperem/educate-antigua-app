import { environment } from "environments/environment";

export class AdmTypology {
    typology_id: number;
    description: string;
    parent_typology: number; 
    value_1: string;
    value_2: string;
    value_3: string;

    constructor(typology_id?: number) {
        this.typology_id = typology_id ? typology_id :  environment.DEFAULT_EMPTY_TYPOLOGY
        this.description = ''
    }
}   