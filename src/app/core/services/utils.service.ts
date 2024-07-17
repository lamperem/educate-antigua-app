import { Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseLoadingService } from '@fuse/services/loading';
import { ApiService } from './apiservice';
import { AdmTypology } from '../models/AdmTypology';
import { CONSTANTS } from '../constants';
import { AdmLocation } from '../models/AdmLocations';
import { environment } from 'environments/environment';
//import { CustomerFieldsListInterface } from 'app/modules/events/interfaces/customer-fields.model';
//import { PaymentMethodModel, ShopPaymentMethodModel } from 'app/modules/shops/models/shop-payment-methods';

@Injectable({providedIn: 'root'})


export class UtilsService {


    //_availableCustomerFields: BehaviorSubject<CustomerFieldsListInterface[]> = new BehaviorSubject(null)
    //_availablePaymentMethods: BehaviorSubject<PaymentMethodModel[]> = new BehaviorSubject([])
    private sessionActivOrganizationkey = CONSTANTS.SESSION_ACTIVE_ORGANIZATION_KEY

    constructor(
        private router: Router,
        private auth: AuthService,
        private _loadingBar: FuseLoadingService,
        private confirmDialog: FuseConfirmationService,
        private dialog: MatDialog,
        private sckaBar: MatSnackBar,
        private apiService: ApiService
    ) 
    { 

    }

    /** Properties */

    get activeOrganization() {
        return sessionStorage.getItem(this.sessionActivOrganizationkey) ?? '';
    }

    get organizationParam() {

        return { org:  this.activeOrganization} as Params
    }

    get sigInOrganizationParam() {
        return {org: this.auth.activeOrganization}
    }

    get OrganizationParam(){
        return  { 
            org: this.activeOrganization
        }
    }


/*     get availableCustomerFields$() {
        return this._availableCustomerFields.asObservable()
    }

    get availablePaymentMethods$() {
        return this._availablePaymentMethods.asObservable()
    } */


    // Methods

    getNavigateUrl(path: string) {
        return `${path}?org=${this.activeOrganization}`
    }


    getEventSettingsParams(eventId: string) {
        return  {
            e: eventId, 
            org: this.activeOrganization
        }
    }

    navigateByOrgURL(url: string) {
        const _url =  this.getNavigateUrl(url)
        this.router.navigateByUrl(_url)
    }

    navigateByEventDetailsURL(event_id: string) {
        const params =  this.getEventSettingsParams(event_id)
        this.router.navigate(['/event/details'], { queryParams: params})

        
    }


    open_confirm_dialog(message: string, _title?: string): Observable<any> {
        let title  = (_title) ? _title : 'Confirmar Acción';

        const dialog =this.confirmDialog.open(
            {
                title,
                message,
                dismissible: true,
                actions: {
                    confirm: {
                        show: true,
                        label: "Continuar"
                    },
                    cancel: {
                        show:true,
                        label: 'Cancelar'
                    }
                }
            }
        )

        return dialog.afterClosed()
    }

    openSnakBar(message?:string) {
        return this.sckaBar.open(
            message,
            '',
            {
                duration: 8000,
                verticalPosition: 'top',
                panelClass: ['bg-rose-600/70','text-white']
            }
        );
    }


    async get_typologies(tipologia_id: number) {
        return await  lastValueFrom(this.getTypology(tipologia_id)) as AdmTypology[]
    }




    private getTypology(tipologia_id: number){
        this._loadingBar.show()
        const url = `/typology/${tipologia_id}`;
        return this.apiService.GetMethod(url, {}, 'Error al obtener catalogos, intente más tarde')
    }

    async get_locations() {
        const locations = await this._getLocations() as AdmLocation[]
        return locations.filter(location => location.status.typology_id === environment.DEFAULT_STATUS_ACTIVE)
    }

    private _getLocations() {
        const url = `/location/get-all/${this.activeOrganization}`
        const params = {start: CONSTANTS.MIN_RECORD , max: CONSTANTS.MAX_RECORD}
        return new Promise((resolve, reject) => {
            this.apiService.GetMethod(url, params, '')
                .subscribe((locations: AdmLocation[]) => {
                    resolve(locations)
                }, error => {
                    resolve([])
                })
        })
    }

    build_event_slug(event_name: string) {
        const ran = (Math.random() + 1).toString(36).substring(8)
        const _slug = event_name.split(' ').join('_')
        return `${ran}_${_slug}`.toLowerCase()
    }



    /**
     * Send a DELETE question using a confirm dialog modal.  
     * @param url 
     * @param dialogTitle to be displayed in dialog content
     * @param question to be showed in dialog content
     * @param error_message to be displayed in snakbar
     * @returns  Objet Promise, 
     */
    deleteWithConfirmDialog(url: string, dialogTitle: string, question:string, error_message:string){ 
        return new Promise ((resolve, reject) => {
            this.open_confirm_dialog(question, dialogTitle)
            .subscribe(response => {
                if (response === 'confirmed') {                 
                    this.apiService.DeleteMethod(url, {}, error_message)
                        .subscribe(
                            response => resolve (response),
                            error => reject(error)
                        )
                        
                }
            })
        })
    }


    buildStoreURL(shop_uuid: string) {
        return  `${environment.SHOP_APP_DOMAIN_URL}/s/code/${shop_uuid}`
    }


/*     getAvailableOrganizationfields(): Promise<Array<CustomerFieldsListInterface>>{
        const url = `/custom-input/org/${this.activeOrganization}`
        return new Promise((resolve, reject) => {
            this.apiService.GetMethod(url, {}, 'Error al Obtener los Customer Fields  disponibles')
                .subscribe((response: CustomerFieldsListInterface[]) => {
                    this._availableCustomerFields.next(response)
                    resolve(response)
                    
                }, error=> {
                    resolve([])
                })
        })
    } */
    

/*     getAvailableOrganizationPayment(): Promise<Array<PaymentMethodModel>>{
        const url = `/organization/get-payment-methods/${this.activeOrganization}`
        return new Promise((resolve, reject) => {
            this.apiService.GetMethod(url, {}, 'Error al Obtener los metodos de pago')
                .subscribe((response: PaymentMethodModel[]) => {
                     response.forEach(item => {
                        item.selected = false
                    })
                    this._availablePaymentMethods.next(response)
                    resolve(response)
                }, error=> {
                    resolve([])
                })
        })
    } */


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


        return  this.confirmDialog.open( {
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
    
}