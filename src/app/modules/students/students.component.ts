import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentsService } from './students.service';
import { StudentsFormComponent } from './students-form/students-form.component';

@Component({
    selector: 'app-students',
    templateUrl: './students.component.html',
    styleUrls: []
})
export class StudentsComponent {
    
    constructor(
        private readonly _dialog: MatDialog,
        private readonly _studentsService: StudentsService,
    ) { }

    ngOnInit() { }

    create() {
        const dialog =  this._dialog.open(StudentsFormComponent, {
            panelClass: ['md:w-3/6', 'w-full'],
            height: 'calc(100vh - 4rem)',
        });

        dialog.afterClosed().subscribe(result => {
            this._studentsService.getStudents();
        });
    }
}
