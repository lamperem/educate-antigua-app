import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';
import { Router } from '@angular/router';
import { Observable, ReplaySubject, catchError, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { FuseLoadingService } from '@fuse/services/loading';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'environments/environment';
import { AuthService } from '../auth/auth.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';


@Injectable({providedIn: 'root'})

export class ApiService {


    private _activeOrganization: ReplaySubject<string> = new ReplaySubject<string>(1);
    
    constructor(
        private _loadingBar : FuseLoadingService,
        private sckaBar: MatSnackBar,
        private http: HttpClient,
        private fuseConfirm: FuseConfirmationService
    ) 
    {
    }


    /** Properties */


    get serverUrl() {
        return `${environment.API_SERVER_URL}/api`
    }

    get OrderAPIURL () {
        return `${environment.ORDERS_API_URL}/api`
    }
 
    /**
     * 
     * @param endpoint API endpoint to fetch data
     * @param params   json params objetc
     * @param errorMessage  string text displaying when status code !=200
     * @returns 
     */
    
    GetMethod(_url: string, params?, errorMessage?:string, apiOrders?: boolean){
        this._loadingBar.show()
        const url =  apiOrders ? `${this.OrderAPIURL}${_url}` : `${this.serverUrl}${_url}`
        return this.http.get(url, { params})
                        .pipe(
                            tap(response => {
                                this._loadingBar.hide()
                            }),
                            catchError((error: HttpErrorResponse) => {
                                this._loadingBar.hide();
                                //
                                let _message = this.build_error_message(error,  errorMessage)
                                this.showErrorMessage(_message)
                                return throwError(this.showErrorMessage(_message))
                            })
                        );
    }

    /**
     * Global POST Method
     * @param endpoint url endpoint
     * @param params  optional query params 
     * @param errorMessage  custom error message to be displayed 
     * @param useOrganization boolean default false 
     * @returns 
     */
    PostMethod(_url: string, body:any, params?, errorMessage?:string, apiOrders?: boolean){
        this._loadingBar.show()
        const url =  apiOrders ? `${this.OrderAPIURL}${_url}` : `${this.serverUrl}${_url}`
        return this.http.post(url, body, {params})
                        .pipe(
                            tap(response => {
                                this._loadingBar.hide()
                            }),
                            catchError((error: HttpErrorResponse) => {
                                this._loadingBar.hide();
                                //
                                let _message = this.build_error_message(error,  errorMessage)
                                this.showErrorMessage(_message)
                                return throwError(this.showErrorMessage(_message))
                            })
                        );
    }

    PutMethod(_url: string, body:any, params?, errorMessage?:string, apiOrders?: boolean) {
        this._loadingBar.show()
        const url =  apiOrders ? `${this.OrderAPIURL}${_url}` : `${this.serverUrl}${_url}`
        return this.http.put(url, body, {params})
                        .pipe(
                            tap(response => {
                                this._loadingBar.hide()
                            }),
                            catchError((error: HttpErrorResponse) => {
                                this._loadingBar.hide();
                                //
                                let _message = this.build_error_message(error,  errorMessage)
                                this.showErrorMessage(_message)
                                return throwError(this.showErrorMessage(_message))
                            })
                        );
    }

    DeleteMethod(_url: string,  params?, errorMessage?:string, apiOrders?: boolean) {
        this._loadingBar.show()
        const url =  apiOrders ? `${this.OrderAPIURL}${_url}` : `${this.serverUrl}${_url}`
        return this.http.delete(url, {params})
                        .pipe(
                            tap(response => {
                                this._loadingBar.hide()
                            }),
                            catchError((error: HttpErrorResponse) => {
                                this._loadingBar.hide();
                                //
                                let _message = this.build_error_message(error,  errorMessage)
                                this.showErrorMessage(_message)
                                return throwError(error)
                            })
                        );
    }


    build_error_message(error: HttpErrorResponse, message?:string){
        let server_error_response = error.error  ?? ''
        return `Error ${error.status} - ${message} - el servidor respondió ${JSON.stringify(server_error_response)}`;
    }

    showErrorMessage(message?:string){
        
        // return this.sckaBar.open(
        //     message,
        //     '',
        //     {
        //         duration: 4000,
        //         verticalPosition: 'top',
        //         panelClass: ['bg-rose-600/70','text-white']
        //     }
        // )


        return  this.fuseConfirm.open( {
            title: 'Ups!',
            message: message,
            icon: {
                show: true,
                name: 'error',
                color:'warning'
            },
            actions: {
                confirm: { show: false},
                cancel: {show:  true}
            },
            dismissible:true

        })

    }

    showSuccessMessage(message?: string){
        return this.sckaBar.open(
            message,
            '',
            {
                duration: 4000,
                verticalPosition: 'top',
                panelClass: ['bg-sky-400/70', 'text-white']
            },
            
        )

    }




    postFormDataFiles(endpoint: string, files: File[], errorMessage?: string) {

        this._loadingBar.show()
        const url =`${this.serverUrl}${endpoint}`;
        const formData = new FormData();

        files.forEach(file => {
            formData.append('files', file, file.name);
        });


        return this.http.post(url, formData).pipe(
            tap(response => { 
                this._loadingBar.hide();
                this.showSuccessMessage('Archivos subidos satisfactoriamente.')
            }),
            catchError((error: HttpErrorResponse) => {
                this._loadingBar.hide()
                console.log(error)
                let _message =  this.build_error_message(error, errorMessage)
                this.showErrorMessage(_message)
                return throwError(error);
            })
        );
    }
    
}