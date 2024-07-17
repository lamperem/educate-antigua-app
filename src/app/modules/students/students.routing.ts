import { Route } from '@angular/router';
import { StudentsComponent } from './students.component';
import { StudentsResolver } from './students.resolver';

export const studentsRoutes: Route[] = [
    {
        path     : '',
        component: StudentsComponent,
        resolve: { students: StudentsResolver }
    }
];
