import { Component, OnInit } from '@angular/core';
import { GetRequestsService } from '../helpers/getRequests.service';
import { AuthService } from '../helpers/authService.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {
  constructor(
    private getRequestsService: GetRequestsService,
    private authService: AuthService
  ) {}
  answers = [
    {
      question: '1. How do I find the Exam Schedule?',
      answer: 'The exam schedule will be posted in the "Exams" section.',
    },
    {
      question: '2. How do I contact the Student Success Advisor (SAA)?',
      answer: 'You can contact SAA via the "Help" section.',
    },
    {
      question: '3. How can I access my Courses?',
      answer: 'Navigate to the "Courses" tab at the bottom of your screen.',
    },
    {
      question: '4. What should I do if the app is not working properly?',
      answer: 'If you experience technical issues, try closing and reopening the app or reach out to our support team for assistance.',
    },
    {
      question: '5. How do I change my profile information?',
      answer: 'To update your profile, select "Profile." Here, you can edit your personal information and preferences.',
    },
    {
      question: '6. How do I log in to the app?',
      answer: 'To log in, enter your registered email and password on the login screen. If you encounter any issues, please check your credentials or contact support.',
    },
    {
      question: '7. What should I do if I forget my password?',
      answer: 'Tap on "Forgot Password?" on the login screen. Follow the prompts to reset your password via the email associated with your account.',
    },
  ];
  public FAQListOBJ: any[] = [];
  public selectedDepartment: any = 'ALL';
  public selectedFAQ: any = [];

  ngOnInit() {
    // this.getRequestsService
    //   .getFAQListFilter()
    //   .pipe(debounceTime(300)) // Adding debounce to avoid quick successive calls
    //   .subscribe((FAQ: any) => {
    //     this.selectedFAQ = ['ALL', ...FAQ];
    //   });
    // this.getFAQbasedOnDepartment(this.selectedDepartment);
  }

  ionViewWillEnter() {
    this.getRequestsService
      .getFAQListFilter()
      .pipe(debounceTime(300)) // Adding debounce to avoid quick successive calls
      .subscribe((FAQ: any) => {
        this.selectedFAQ = ['ALL', ...FAQ];
      });
    this.getFAQbasedOnDepartment(this.selectedDepartment);
  }

  getFAQbasedOnDepartment(department: string) {
    this.selectedDepartment = department; // Update the selected department
    this.FAQListOBJ = this.getRequestsService.getFAQList(
      this.selectedDepartment
    );
    console.log(this.FAQListOBJ); // Call to filter FAQs based on the new department
  }

  // async SearchFAQList() {
  //   try {
  //     const finalList = await this.getRequestsService
  //       .getFAQSearch(this.SearchFAQ)
  //       .toPromise()
  //     if (finalList) {

  //     }
  //   } catch (error) {
  //     console.error('Failed to fetch details', error)
  //   }
  // }
}
