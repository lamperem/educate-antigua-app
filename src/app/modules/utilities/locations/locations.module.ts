import { NgModule } from '@angular/core';
import { LocationsComponent } from './locations.component';
import { LocationFormComponet } from './location-form-component/location-form.component';
import { Route, RouterModule } from '@angular/router';
import { FuseCardModule } from '@fuse/components/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UtilsComponentsModule } from 'app/modules/utils-components/utils-components.module';
import {MatDialogModule} from '@angular/material/dialog'; 

const routes: Route[] = [
    {
        path     : 'locations',
        component: LocationsComponent
    }

];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        FuseCardModule,
        
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatSidenavModule,
        MatTabsModule,
        SharedModule,
        MatDialogModule,
        

        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        UtilsComponentsModule
    ],
    exports: [LocationFormComponet],
    declarations: [
        LocationsComponent,
        LocationFormComponet
    ],
    providers: [],
})
export class LocationsModule { }
