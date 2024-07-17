import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StudentCreateDTO, StudentListDTO, StudentUpdateDTO } from './models/student.dto';
import { ApiService } from 'app/core/services/apiservice';
import { UtilsService } from 'app/core/services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

    _studentsList: BehaviorSubject<Array<StudentListDTO>> =  new BehaviorSubject(null);

    constructor(
        private readonly _apiService: ApiService,
        private readonly _utils: UtilsService,
    ) 
    { 

    }

    /** Properties */
    get studentsList$ () {
        return this._studentsList.asObservable()
    }

    getStudents(): Promise<Array<StudentListDTO>> {
        return new Promise((resolve, reject) => {
            const url = `/students`;

            this._apiService.GetMethod(url, {}, 'Error al obtener los estudiantes')
                .subscribe((data: Array<StudentListDTO>) => {
                    console.log('students: ', data);
                    this._studentsList.next(data);

                    resolve (data);
                })
        })
    }

    getStudentInfo(student_id: number): Promise<StudentListDTO> {
        return new Promise((resolve, reject) => {
            const url = `/students/info/${student_id}`;

            this._apiService.GetMethod(url, {}, 'Error al obtener los estudiantes')
                .subscribe((data: StudentListDTO) => {
                    resolve (data);
                })
        })
    }

    createStudent(student: StudentCreateDTO){
        const url = `/students`;

        return new Promise((resolve, reject) => {
            this._apiService.PostMethod(url, student, {}, 'Error al crear el estudiante', false)
                    .subscribe(response => {
                        resolve(response)
                    })
        })
    }

    updateStudent(student: StudentUpdateDTO): Promise<void> {
        const url = `/students/${student.student_id}`;

        return new Promise((resolve, reject) => {
            this._apiService.PutMethod(url, student, {}, 'Error al actualizar al estudiante', false)
                .subscribe(_ => {
                    resolve();
                })
        })
    }

    deleteStudent(student: StudentListDTO): Promise<void> {
        return new Promise((resolve, reject) => {

            this._utils.open_confirm_dialog('¿Esta seguro que desea remover el campo?', 'Confirmar acción')
                .subscribe(response => {

                    if (response == 'confirmed') {
                        const url = `/students/${student.student_id}`;

                        student.status = 160005;

                        this._apiService.PutMethod(url, student, {}, 'Error al actualizar el campo', false)
                            .subscribe(response => resolve());
                    }
                })
        })
    }

}
