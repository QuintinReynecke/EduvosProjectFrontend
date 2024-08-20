import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  public questionText: string = ''; 
  public groupShowHide:boolean = false;
  public groupsMessage: string= "View Groups...";
  myGroups: string[] = [
    "IT something 1",
    "IT something 2",
    "IT something 3",
    "IT something 4",
  ]

  constructor() {}

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
    console.log('Group selected: ', groupSelect.target.outerText);
  }
}
