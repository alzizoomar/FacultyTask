import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from '../student.service';
import { take } from 'rxjs/operators';
import { FacultyService } from '../faculty.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { StudentsDetails } from '../studentInterface';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  facultys$;
  student: StudentsDetails = {} as StudentsDetails;
  id;

  ngOnInit() {}

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private facultyService: FacultyService,
    public toastr: ToastrManager) {
      this.facultys$ = facultyService.getAll();

      this.id = this.route.snapshot.paramMap.get('id');
      if (this.id) { this.studentService.get(this.id).pipe(take(1)).subscribe(s => this.student = s);
    }
   }

   save(student) {
    if (this.id) { this.studentService.update(this.id, student); } else {
    this.studentService.create(student);
    }
    this.showSuccess();
    this.router.navigate(['/']);
  }

  showSuccess() {
    this.toastr.successToastr('Data Saved Successfully', 'Success!');
  }

}
