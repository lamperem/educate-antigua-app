import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'; 
import { SharedModule } from 'app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ArrowBackComponent } from './arrow-back/arrow-back.component';
import { AvailableFieldsComponent } from './available-fields/available-fields.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
    imports: [
        MatIconModule,
        SharedModule,
        CommonModule,
        MatSelectModule,
        MatDialogModule,
        MatInputModule,
        MatMenuModule,
        MatAutocompleteModule,
        MatButtonModule,
        //CustomDirectivesModule,
        MatFormFieldModule,
        FormsModule,
        MatSelectModule,
        MatCheckboxModule,
        MatSlideToggleModule,
        MatRadioModule,
    
    ],
    exports: [
        ArrowBackComponent, 
        AvailableFieldsComponent
],
    declarations: [
        ArrowBackComponent,
        AvailableFieldsComponent],
    providers: [],
})
export class UtilsComponentsModule { }