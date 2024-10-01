import { Component, OnInit } from '@angular/core';
import { AuthService } from '../helpers/authService.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.page.html',
  styleUrls: ['./answers.page.scss'],
})
export class AnswersPage implements OnInit {
  constructor(private authService: AuthService) {}

  public isAuthenticated:boolean = false
  public DepartmentListOBJ: any;
  public facultyType: any;
  public question: any;
  public answer: any;
  public department: any;

  ngOnInit() {
    this.DepartmentListOBJ = this.authService.getDepartment();
    this.checkAuthentication()
  }

  checkAuthentication() {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  askDepartmentTheQuestion() {
    const currentDate = new Date();
    console.log('Date: ', currentDate);
    console.log('Faculty: ', this.facultyType);
    console.log('Department: ', this.department);
    console.log('Question: ', this.question);
  }
}
