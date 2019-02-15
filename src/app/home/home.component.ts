import { StudentService } from '../student.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudentsDetails } from '../studentInterface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {
  students: StudentsDetails = [] as StudentsDetails;
  subscription: Subscription;

  constructor(private studentService: StudentService) {
    this.subscription = this.studentService.getAll()
      .subscribe(students =>  this.students = students);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
