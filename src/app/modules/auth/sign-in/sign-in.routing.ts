import { Route } from '@angular/router';
import { SignInClassicComponent } from './sign-in.component';

export const authSignInRoutes: Route[] = [
    {
        path     : '',
        component: SignInClassicComponent
    }
];
