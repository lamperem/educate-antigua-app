import { JwtHelperService } from "@auth0/angular-jwt";
import { CONSTANTS } from "../constants";


export class AdmCreatedBy {
    user_uuid: string;
    user_name: string;

    constructor () {
        const _jwtHelper = new JwtHelperService();
        try {
            const token  = sessionStorage.getItem(CONSTANTS.SESSION_ACCESS_TOKEN_KEY) ?? '';
            const decoded = (_jwtHelper.decodeToken(token)) as DecodedToken
            this.user_uuid =  decoded.user_uuid
            this.user_name =  decoded.name
        }
        catch {
            this.user_uuid = '0000-00-00'
            this.user_name = ''
        }

    }
}


export interface DecodedToken {
    user_uuid: string
    email: string
    name: string
}