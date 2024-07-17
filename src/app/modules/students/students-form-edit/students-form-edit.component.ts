import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { UtilsService } from 'app/core/services/utils.service';
import { StudentsService } from '../students.service';
import { StudentInfoDTO, StudentUpdateDTO } from '../models/student.dto';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-students-form-edit',
    templateUrl: './students-form-edit.component.html',
    styleUrls: []
})
export class StudentsFormEditComponent {
    public fieldForm: StudentUpdateDTO;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: StudentInfoDTO,
        public dialogRef: DialogRef<StudentsFormEditComponent>,
        private readonly _utils: UtilsService,
        private readonly _studentsService: StudentsService
    ) 
    {
        this.fieldForm = new StudentUpdateDTO();
        this.fieldForm = this.data;

        console.log('data: ', this.fieldForm);
    }

    async update(): Promise<void> {
        try {
            const newField = await this._studentsService.updateStudent(this.fieldForm);
    
            this.dialogRef.close();

            return;
        } catch (error) {
            this._utils.showErrorMessage('Ha ocurrido un error. Intente de nuevo.')
        }
    }
}
