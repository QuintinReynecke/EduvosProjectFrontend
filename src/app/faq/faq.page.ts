import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {

  constructor() { }

  faqs = [
    { question: 'How do I reset my password?', answer: 'Go to settings and click on "Reset Password".' },
    { question: 'Where can I find my timetable?', answer: 'Your timetable is available in the "Schedule" section.' },
  ];

  ngOnInit() {
  }

}
