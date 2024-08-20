import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.page.html',
  styleUrls: ['./answers.page.scss'],
})
export class AnswersPage implements OnInit {

  constructor() { }

  answers = [
    { question: 'What is the exam schedule?', answer: 'The exam schedule will be posted in the "Exams" section.' },
    { question: 'How do I contact SAA?', answer: 'You can contact SAA via the "Help" section.' },
  ];


  ngOnInit() {
  }

}
