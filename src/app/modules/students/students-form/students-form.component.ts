import { Component } from '@angular/core';
import { StudentCreateDTO } from '../models/student.dto';
import { DialogRef } from '@angular/cdk/dialog';
import { UtilsService } from 'app/core/services/utils.service';
import { StudentsService } from '../students.service';

@Component({
    selector: 'app-students-form',
    templateUrl: './students-form.component.html',
    styleUrls: []
})
export class StudentsFormComponent {
    public fieldForm: StudentCreateDTO;

    constructor(
        public dialogRef: DialogRef<StudentsFormComponent>,
        private readonly _utils: UtilsService,
        private readonly _studentsService: StudentsService
    ) 
    { 

        this.fieldForm = new StudentCreateDTO();
    }

    async add(): Promise<void> {
        try {
            const newField = await this._studentsService.createStudent(this.fieldForm);
    
            this.dialogRef.close();

            return;
        } catch (error) {
            this._utils.showErrorMessage('Ha ocurrido un error. Intente de nuevo.')
        }
    }
}
