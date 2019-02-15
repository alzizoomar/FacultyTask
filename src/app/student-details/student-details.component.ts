import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from '../student.service';
import { take } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';
import { StudentsDetails } from '../studentInterface';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  student: StudentsDetails = {} as StudentsDetails;
  id;

  ngOnInit() {}

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService,
    public toastr: ToastrManager) {

      this.id = this.route.snapshot.paramMap.get('id');
      if (this.id) { this.studentService.get(this.id).pipe(take(1)).subscribe(s => this.student = s);
    }
   }

   delete() {
    if (confirm('Are you sure you want to DELETE this Student?')) {
      this.studentService.delete(this.id);
      this.showSuccess();
      this.router.navigate(['/']);
    } else { this.showError(); }
  }

  showSuccess() {
    this.toastr.successToastr('The Student Has Been Deleted.', 'Success!');
  }

  showError() {
    this.toastr.errorToastr('Some Thing went Wrong.', 'Oops!');
}



}
