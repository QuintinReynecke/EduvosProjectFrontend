import { Component, OnInit } from '@angular/core';
import { GetRequestsService } from '../helpers/getRequests.service'
import { AuthService } from '../helpers/authService.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {

  constructor(private getRequestsService: GetRequestsService, private authService: AuthService,) { }
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
  public FAQListOBJ:any;
  public selectedDepartment:any = "All"
  ngOnInit() {
    this.getFAQbasedOnDepartment(this.selectedDepartment)
  }

  getFAQbasedOnDepartment(choice:any){
    this.FAQListOBJ = this.getRequestsService.getFAQList(choice)
    console.log(this.FAQListOBJ)
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
