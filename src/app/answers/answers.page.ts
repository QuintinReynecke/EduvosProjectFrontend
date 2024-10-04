import { PostRequestsService } from '../helpers/postRequests.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../helpers/authService.service';
import { GetRequestsService } from '../helpers/getRequests.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.page.html',
  styleUrls: ['./answers.page.scss'],
})
export class AnswersPage implements OnInit {
  constructor(
    private authService: AuthService,
    private getRequestsService: GetRequestsService,
    private postRequestsService:PostRequestsService
  ) {}

  public isAuthenticated: boolean = false;
  public DepartmentListOBJ: any[] = [];
  public facultyType: any;
  public question: any;
  public answer: any;
  public department: any;

  ngOnInit() {
    this.getRequestsService
      .getDepartmentListFilter()
      .pipe(debounceTime(300)) // Adding debounce to avoid quick successive calls
      .subscribe((Department: any) => {
        this.DepartmentListOBJ = Department;
      });
    this.checkAuthentication();
  }

  ionViewWillEnter() {
    this.getRequestsService
      .getDepartmentListFilter()
      .pipe(debounceTime(300)) // Adding debounce to avoid quick successive calls
      .subscribe((Department: any) => {
        this.DepartmentListOBJ = Department;
      });
    this.checkAuthentication();
  }

  checkAuthentication() {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  askDepartmentTheQuestion() {
   
    this.postRequestsService.newPersonalChat(this.facultyType,this.question, this.department)
  }
}
