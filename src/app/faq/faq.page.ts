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
      question: 'What is the exam schedule?',
      answer: 'The exam schedule will be posted in the "Exams" section.',
    },
    {
      question: 'How do I contact SAA?',
      answer: 'You can contact SAA via the "Help" section.',
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
