import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import {CoomingSoonComponent } from './cooming-soon.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';



const routes: Route[] = [
    {
        path     : '',
        component: CoomingSoonComponent
    }
]

@NgModule({
    declarations: [
        CoomingSoonComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatIconModule,
        SharedModule
    ]
})
export class CoomingSoonModule
{
}
