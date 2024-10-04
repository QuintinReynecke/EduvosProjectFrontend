import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../helpers/authService.service';
import { GetRequestsService } from '../helpers/getRequests.service';
import { MySharedService } from '../helpers/MySharedService';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public isAuthenticated: boolean = false;
  public questionText: string = '';
  public groupShowHide: boolean = false;
  public groupsMessage: string = 'View Groups...';
  myGroups: string[] = ['IT Group 1', 'IT Group 2', 'IT Group 3', 'IT Group 4'];

  selectedGroup: string[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private getRequestsService: GetRequestsService,
    private myService: MySharedService
  ) {}

  public username: any;
  ngOnInit(): void {
    this.checkAuthentication();
  }
  ionViewWillEnter() {
    this.checkAuthentication();
  }

  async checkAuthentication() {
    this.isAuthenticated = this.authService.isAuthenticated();

    if (!this.isAuthenticated) {
      this.username = 'please log in...';
      return;
    } else {
      // User is authenticated
      this.username = this.authService.getUsername();
      await this.getUserInformation();
    }
  }

  async getUserInformation() {
    try {
      const userInfo = await this.getRequestsService
        .getUserInfo(this.authService.getProfileID())
        .toPromise();
      if (userInfo) {
        // Clean up escape characters from groups strings
        const cleanedGroups = userInfo[0].groups
          .replace(/\\\"/g, '')
          .split('", "')
          .map((groups: string) => groups.trim())
          .filter((groups: string) => groups.length > 0); // Filter out empty groups

        this.selectedGroup = cleanedGroups;
        console.log('cleanedGroups');
        console.log(this.selectedGroup);
      }
    } catch (error) {
      console.error('Failed to fetch user details', error);
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
      : 'Hide Groups...';
    this.groupShowHide = !this.groupShowHide;
  }

  openGroup(groupSelect: any) {
    this.router.navigate(['/group-chat']);
    console.log('Group selected: ', groupSelect.target.outerText);
    this.myService.setGroupNameVAL(groupSelect.target.outerText);
  }
}
