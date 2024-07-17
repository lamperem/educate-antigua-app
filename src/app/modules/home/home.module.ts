import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ExampleComponent } from 'app/modules/admin/example/example.component';
import { HomeComponent } from './home.component';
import { OrganizationGuard } from 'app/core/auth/guards/organization.guard';
import { FinanceDashboardComponent } from './finance-dashboard/finance-dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'app/shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';


const exampleRoutes: Route[] = [
    {
        path     : '',
        component: HomeComponent,
    },
    {
        path     : 'dashboard',
        component: FinanceDashboardComponent,
    }
];

@NgModule({
    declarations: [
        HomeComponent,
        FinanceDashboardComponent
    ],
    imports     : [
        RouterModule.forChild(exampleRoutes),
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatSortModule,
        MatTableModule,
        NgApexchartsModule,
        SharedModule
    ]
})
export class HomeModule
{
}
