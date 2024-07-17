import { Route } from '@angular/router';
import { InitialDataResolver } from './app.resolvers';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';

export const establishmentRoutes: Route[] = [

    // Admin routes
    {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [

            {path: 'home',   loadChildren: () => import('app/modules/home/home.module').then(m => m.HomeModule)},
            {path: 'students', loadChildren: () => import('app/modules/students/students.module').then(m => m.StudentsModule)},

            // Work In progress
            {path: 'work-in-progress', pathMatch: 'full', loadChildren: () => import('app/modules/landing/cooming-soon/cooming-soon.module').then(m => m.CoomingSoonModule)},
            {path: 'logout',  redirectTo: 'sign-out'},

            // 404 & Catch all
            {path: '404-not-found', pathMatch: 'full', loadChildren: () => import('app/modules/landing/404/error-404.module').then(m => m.Error404Module)},
            {path: 'not-found', pathMatch: 'full', loadChildren: () => import('app/modules/landing/404/error-404.module').then(m => m.Error404Module)},
            {path: '**', redirectTo: '404-not-found'}
            
        ]
    }
    

]