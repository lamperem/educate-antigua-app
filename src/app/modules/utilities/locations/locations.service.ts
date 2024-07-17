import { Injectable } from '@angular/core';
import { ApiService } from 'app/core/services/apiservice';
import { LocationCreateDTO } from './models/locations-create.model';

@Injectable({providedIn: 'root'})

export class LocationsService {
    constructor
    (
        private apiService: ApiService
    ) 
    {

    }

    addLocation(_location: LocationCreateDTO) { 
        const url = '/location/create-location';
        const location = {..._location}
        delete location.location_uuid
        
        return new Promise((resolve, reject) => {
            this.apiService.PostMethod(url, location, {}, 'Error al crear nueva ubicación del evento, intente más tarde')
                .subscribe(location => {
                    resolve(location)
                })
        })
    }
    
}