import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment as env } from 'environments/environment';
import { AuthResponseDTO } from './auth.interfaces';
import { Router } from '@angular/router';
import { CONSTANTS } from '../constants';
import { User } from '../user/user.types';


@Injectable()
export class AuthService
{
    private _authenticated: boolean = false;
    private _jwtHelper = new JwtHelperService();
    private _apiURL = env.API_SERVER_URL;

    private sessionAccessTokenKey = CONSTANTS.SESSION_ACCESS_TOKEN_KEY
    private sessionActivOrganizationkey = CONSTANTS.SESSION_ACTIVE_ORGANIZATION_KEY

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        sessionStorage.setItem(this.sessionAccessTokenKey, token);
    }

    

    get accessToken(): string
    {
        return sessionStorage.getItem(this.sessionAccessTokenKey) ?? '';
    }

    get decodedToken() {
        return this._jwtHelper.decodeToken(this.accessToken)
    }


    // Active co
    set activeOrganization(key: string) 
    {
        sessionStorage.setItem(this.sessionActivOrganizationkey, key)
    }

    get activeOrganization() {
        return sessionStorage.getItem(this.sessionActivOrganizationkey) ?? '';
    }



    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any>
    {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any>
    {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any>
    {
        const params = {
            username: credentials.email,
            password: credentials.password
        }

        // Throw error, if the user is already logged in
        if ( this._authenticated )
        {
            return throwError('User is already logged in.');
        }
        const url  = `${this._apiURL}/api/auth/authorization`
        return this._httpClient.post(url, params).pipe(
            switchMap((response: AuthResponseDTO) => {

                // Store the access token in the local storage
                this.accessToken = response.token;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                //this._userService.user = response.details;

                // Decoded token 
                // const decoded = this._jwtHelper.decodeToken(response.accessToken)

                // Return a new observable with the response

                //this.checkOrganizationActive(response.details)

                // redirect url
                //this._router.navigate(['/signed-in-redirect'], {queryParams: {org: this.activeOrganization}})
                this._router.navigate(['/signed-in-redirect'])
                
                return of(response);
            })
        );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any>
    {
        // Sign in using the token
        const url  = `${this._apiURL}/api/profile/info`
        return this._httpClient.get(url, {}).pipe(
            catchError(() =>

                // Return false
                of(false)
            ),
            switchMap((response: any) => {

                // Replace the access token with the new one if it's available on
                // the response object.
                //
                // This is an added optional step for better security. Once you sign
                // in using the token, you should generate a new one on the server
                // side and attach it to the response object. Then the following
                // piece of code can replace the token with the refreshed one.
            
        
                this.accessToken = this.accessToken;
             

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                //this._userService.user = response;

                //this.checkOrganizationActive(response)

                // Return true
                return of(true);
            })
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        sessionStorage.clear()
        //sessionStorage.removeItem(this.sessionAccessTokenKey)
        //sessionStorage.removeItem(this.accessToken)

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        // Check if the user is logged in
        if ( this._authenticated )
        {
            return of(true);
        }

        // Check the access token availability
        if ( !this.accessToken )
        {
            return of(false);
        }

        // Check the access token expire date
        if ( AuthUtils.isTokenExpired(this.accessToken) )
        {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }



    checkOrganizationActive(response: User){
        if (response.organizations.length == 1) {
            let activeOrganization = response.organizations[0].organization_uuid
            this.activeOrganization = activeOrganization
        }
    }

    setActiveOrganization(response:User){
        const active_org = response.organizations[0].organization_uuid
        this.activeOrganization = active_org
        return active_org
    }


    setUserProfile(){

    }
}



