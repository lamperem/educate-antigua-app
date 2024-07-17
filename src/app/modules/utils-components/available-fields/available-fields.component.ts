import { Component, Input, OnInit } from '@angular/core';
import {AvailableFields} from '../../event-settings/register/customer-form/fields-data'
import { CustomerFieldsListInterface } from 'app/modules/events/interfaces/customer-fields.model';
import { combineLatest, Observable, Subject, takeUntil, tap } from 'rxjs';
import { EventsService } from 'app/modules/events/events.service';
import { UtilsService } from 'app/core/services/utils.service';
import { EventSettingsService } from 'app/modules/event-settings/event-settings.service';
import { ShopsService } from 'app/modules/shops/shops.service';


@Component({
    selector: 'app-available-fields-component',
    templateUrl: 'available-fields.component.html'
})

export class AvailableFieldsComponent implements OnInit {
    @Input()shop_uuid:  string;

    availableFields: CustomerFieldsListInterface[]=[]
    event_fields: CustomerFieldsListInterface[] =[]
    mandatoryFieldsKeys = ['name','last_name','email' ]

    private unsubscribeAll: Subject<any> = new Subject()
    constructor(
        private _eventService:  EventsService,
        private _eventSettings: EventSettingsService,
        private _uitlsService: UtilsService,
        private _shopService: ShopsService

    ) 
    { 
  

    }

    ngOnInit() { 

        let sourcesToCobine: Array<Observable<any>>

        // check if will use events or shop fields
        if (this.shop_uuid) {
            sourcesToCobine = [this._uitlsService.availableCustomerFields$ , this._shopService.shopCustomerFields$]
        }
        else {
            sourcesToCobine = [this._eventService.availableCustomerFields$, this._eventService.eventCustomerFields$] 
        }
        
        combineLatest(sourcesToCobine)
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(fieldResult => {

                const _availableFields = fieldResult[0] as CustomerFieldsListInterface[]
                const _eventField = fieldResult[1] as CustomerFieldsListInterface[]

                if (_eventField && _eventField[0]) {

                    // mark as include current items . 
                    _eventField.forEach(eventField => {
                        this.availableFields =  _availableFields.map(item => {
                                if (item.input_id === eventField.input_id) {
                                    item.include =  true
                                }
                                return item
                        })
                    })
                }
                else {  

                    console.log('se insertaran valores nuevos ')

                    // update event or shop with mandatory values.
                    if ( _availableFields && _availableFields[0]){
                        this.post_defaultFields(_availableFields)
                            
                    } 
                    
                    this.availableFields = _availableFields
                }



            })

    }


    ngOnDestroy(){
        //update items 
        if (this.shop_uuid) {
            this._shopService.updateShopFileds(this.shop_uuid, this.availableFields)
        }
        else {
            this._eventService.updateEventFileds(this._eventSettings.event_uuid,  this.availableFields)
        }

        this.unsubscribeAll.next(null)
        this.unsubscribeAll.complete()
    }


    isMandatory(key){
        return this.mandatoryFieldsKeys.includes(key)
    }

    post_defaultFields(_availableFields: CustomerFieldsListInterface[]){

        const _mandatoryFields = _availableFields.slice(0,3).map(field => {
                field.include = true
                return field
        })

        //update items 
        if (this.shop_uuid) {
            this._shopService.updateShopFileds(this.shop_uuid, _mandatoryFields)
        }
        else {
            this._eventService.updateEventFileds(this._eventSettings.event_uuid,  _mandatoryFields)
        }
    }

}