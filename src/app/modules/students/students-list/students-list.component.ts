import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentsService } from '../students.service';
import { StudentListDTO } from '../models/student.dto';
import { Observable } from 'rxjs';
import { StudentsFormEditComponent } from '../students-form-edit/students-form-edit.component';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: []
})
export class StudentsListComponent {
    public studentsList$: Observable<Array<StudentListDTO>>;

    constructor(
        private readonly _dialog: MatDialog,
        private readonly _studentsService: StudentsService,
    ){
        this.studentsList$ = this._studentsService.studentsList$;
    }

    ngOnInit() { }

    async edit(student: StudentListDTO) {
        const studentInfo = await this._studentsService.getStudentInfo(student.student_id);

        const dialog =  this._dialog.open(StudentsFormEditComponent, {
            panelClass: ['md:w-3/6', 'w-full'],
            height: 'calc(100vh - 4rem)',
            data: studentInfo[0]
        });

        dialog.afterClosed().subscribe(result => {
            this._studentsService.getStudents();
        });
    }

    async deleteField(student: StudentListDTO) {
        try {
            const studentInfo = await this._studentsService.getStudentInfo(student.student_id);

            await this._studentsService.deleteStudent(studentInfo);
            await this._studentsService.getStudents();

            return;
        } catch (error) {
            console.error(error);
        }
    }
}
