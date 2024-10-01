import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../helpers/authService.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit{
  public isAuthenticated:boolean = false
  public questionText: string = ''; 
  public groupShowHide:boolean = false;
  public groupsMessage: string= "View Groups...";
  myGroups: string[] = [
    "IT Group 1",
    "IT Group 2",
    "IT Group 3",
    "IT Group 4",
  ]

  constructor(private router: Router, private authService: AuthService,) {}

  public username:any
  ngOnInit(): void {
    this.checkAuthentication()
  }

  checkAuthentication() {
    this.isAuthenticated = this.authService.isAuthenticated();

    if (!this.isAuthenticated) {
      this.username = "please log in...";
      return;
    } else {
      // User is authenticated
      this.username = this.authService.getUsername();
    }
    
  }

  submitQuestion() {
    if (this.questionText) {
      // Logic to submit the question (to a backend service)
      console.log('Question submitted:', this.questionText);
      // Clear the question text
      this.questionText = '';
    }
  }

  ShowHideGroups() {
    this.groupsMessage = this.groupShowHide
      ? 'View Groups...'
      : 'Hide Groups...'
    this.groupShowHide = !this.groupShowHide
  }

  openGroup(groupSelect: any) {
    this.router.navigate(['/group-chat'])
    console.log('Group selected: ', groupSelect.target.outerText);
  }
}
