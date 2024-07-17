import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// routing
import { studentsRoutes } from './students.routing';
import { RouterModule } from '@angular/router';

// share componentes
import { SharedModule } from 'app/shared/shared.module';

// material components
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';

// fuse
import { FuseCardModule } from '@fuse/components/card';

// components
import { StudentsComponent } from './students.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentsFormComponent } from './students-form/students-form.component';
import { StudentsFormEditComponent } from './students-form-edit/students-form-edit.component';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentsListComponent,
    StudentsFormComponent,
    StudentsFormEditComponent
  ],
  imports: [
    RouterModule.forChild(studentsRoutes),
    CommonModule,
    SharedModule,

    // material
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatDividerModule,
    MatDialogModule,
    MatRadioModule,

    // fuse
    FuseCardModule,
  ]
})
export class StudentsModule { }
