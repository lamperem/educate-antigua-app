export class StudentListDTO {
    student_id: number;
    code: string;
    type: number;
    person_id: number;
    manager_person_id: number;
    user_id: number;
    created_by: number;
    creation_date: string;
    modified_by: number;
    modification_date: string;
    status: number;
}

export class StudentCreateDTO {
    dni: string;
    dni_type: number;
    name: string;
    surname: string;
    dob: string;
    gender: number;
    marital_status: number;
    is_minor: boolean;
    address_country_iso: number;
    address_local_state: number;
    address_local_city: number;
    address_local_zone: number;
    contact_email: string;
    contact_phone: string;
    type: number;
}

export class StudentUpdateDTO {
    student_id: number;
    code: string;
    type: number;
    person_id: number;
    manager_person_id: number;
    user_id: number;
    created_by: number;
    creation_date: string;
    modified_by: number;
    modification_date: string;
    status: number;
    dni: string;
    dni_type: number;
    name: string;
    surname: string;
    dob: string;
    gender: number;
    marital_status: number;
    is_minor: boolean;
    address_country_iso: number;
    address_local_state: number;
    address_local_city: number;
    address_local_zone: number;
    contact_email: string;
    contact_phone: string;
}


export class StudentInfoDTO extends StudentCreateDTO {
    student_id: number;
    code: string;
    type: number;
    person_id: number;
    manager_person_id: number;
    user_id: number;
    created_by: number;
    creation_date: string;
    modified_by: number;
    modification_date: string;
    status: number;

    constructor() {
        super()
    }
}