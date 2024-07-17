import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocationCreateDTO } from '../models/locations-create.model';
import { LocationsService } from '../locations.service';
import { EventsService } from 'app/modules/events/events.service';

@Component({
    selector: 'app-location-form-component',
    templateUrl: 'location-form.component.html'
})

export class LocationFormComponet implements OnInit {

    location: LocationCreateDTO 

    constructor(
        public dialogRef: MatDialogRef<LocationFormComponet>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private locationService: LocationsService,
        private eventService: EventsService
    ) 
    { 
        this.location =  data.location
    }

    ngOnInit() { }


    /**
     * Create a new event location. 
     * When location is created, update the location list in the add event form 
     * finally closes the  dialog and sending the new location created.
     */
    addLocation(){
        this.locationService.addLocation(this.location)
            .then(location => {
                // update Locations Catalogs List
                this.eventService.getEventLocations()
                    // close dialog
                    .then(() => this.dialogRef.close(location))
            })
    }

}