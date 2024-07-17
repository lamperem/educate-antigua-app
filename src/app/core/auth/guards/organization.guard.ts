// parametro-guard.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OrganizationGuard implements CanActivate {
  constructor( private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const organization = route.queryParams.org

    // TODO validar organization id contra cokkie session
    if (organization) {
        return true
    }

    else {
        // redirigir a vista de organizaciones ,  o si es una sola redirigir a la organizacion unica.
        return false
    }
 
  }


}
