import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { StudentsService } from './students.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private readonly _studentsService: StudentsService,
    )
    {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        // Fork join multiple API endpoint calls to wait all of them to finish
        return forkJoin([
            this._studentsService.getStudents()
        ]);
    }
}