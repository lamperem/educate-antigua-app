import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { Navigation } from 'app/core/navigation/navigation.types';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { defaultNavigationData } from './navigation.data';
import { UtilsService } from '../services/utils.service';
import { Params } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class NavigationService
{
    private _navigation: ReplaySubject<Navigation> = new ReplaySubject<Navigation>(1);

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private utils: UtilsService
    
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation>
    {
        return this._navigation.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    get(): Observable<Navigation>
    {
        return this._httpClient.get<Navigation>('api/common/navigation').pipe(
            tap((navigation) => {
                this._navigation.next(navigation);
            })
        );
    }

    getNabygationByEstablishment(){

        return new Promise((resolve, reject) => {
            // get base navigation
            const _baseNavigation: FuseNavigationItem[] = defaultNavigationData

            // set organization Query param on each link
            const _defaultNavigation = _baseNavigation.map(navigationItem => {
                return this.setNavigationQueryParam(navigationItem, this.utils.OrganizationParam)
            })


              // set navigation 
              let _navigation =  {
                compact: _defaultNavigation
            }
            this._navigation.next(_navigation as Navigation);
            resolve(true)
        })
    }

    setNavigationQueryParam(navigation: FuseNavigationItem, params: Params) {
            //parent item
            if (navigation.link) {
                navigation.queryParams =  params
            }
            //childs recursive
            if (navigation.children) {
                const children = navigation.children.map(item => {
                    return this.setNavigationQueryParam(item, params)
                })
                navigation.children = children
            }
            return navigation
    }

    


    
}
