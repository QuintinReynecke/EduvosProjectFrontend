import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { httpConfig } from './httpConfig';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GetRequestsService {
  private connString: any = this.myHTTPrequests.GetConnURL();

  constructor(private http: HttpClient, private myHTTPrequests: httpConfig) {}

  public counter: any;
  public testBool: boolean = false;
  public FAQListOBJ: any = [];
  public FAQListInOBJ: any = {};
  public GroupsListOBJ: any = [];
  public GroupsListInOBJ: any = {};

  // getAllServices(): Observable<any> {
  //   return this.http.get(`${this.connString}getServiceList`)
  // }

  // getServiceType(category: string): Observable<any> {
  //   return this.http.get(`${this.connString}getServiceT/${category}`)
  // }

  getFAQList(department: string) {
    this.http
      .get(this.connString + 'getFAQList/' + department)
      .subscribe((GetAllFAQList: any) => {
        this.testBool = false;
        this.counter = 0;

        while (this.testBool != true) {
          this.FAQListInOBJ = {};
          if (GetAllFAQList[this.counter] == undefined) {
            this.testBool = true;
          }
          if (GetAllFAQList[this.counter] != undefined) {
            this.FAQListInOBJ.FAQList = GetAllFAQList[this.counter];
            this.FAQListOBJ.push(this.FAQListInOBJ);
          }
          this.counter++;
        }
      });
    return this.FAQListOBJ;
  }

  getGroupsList(department: string) {
    this.http
      .get(this.connString + 'getGroupsList/' + department)
      .subscribe((GetAllGroupsList: any) => {
        this.testBool = false;
        this.counter = 0;

        while (this.testBool != true) {
          this.GroupsListInOBJ = {};
          if (GetAllGroupsList[this.counter] == undefined) {
            this.testBool = true;
          }
          if (GetAllGroupsList[this.counter] != undefined) {
            this.GroupsListInOBJ.GroupsList = GetAllGroupsList[this.counter];
            this.GroupsListOBJ.push(this.GroupsListInOBJ);
          }
          this.counter++;
        }
      });
    return this.GroupsListOBJ;
  }

  public SubjectListOBJ: any = []
  public SubjectListInOBJ: any = {}
  getSubjectList(department: string) {
    this.http
      .get(this.connString + 'getSubjectList/' + department)
      .subscribe((GetAllSubjectList: any) => {
        this.testBool = false
        this.counter = 0

        while (this.testBool != true) {
          this.SubjectListInOBJ = {}
          if (GetAllSubjectList[this.counter] == undefined) {
            this.testBool = true
          }
          if (GetAllSubjectList[this.counter] != undefined) {
            this.SubjectListInOBJ.SubjectList = GetAllSubjectList[this.counter]
            this.SubjectListOBJ.push(this.SubjectListInOBJ)
          }
          this.counter++
        }
      })
    return this.SubjectListOBJ
  }

  public DepartmentListOBJ: any = []
  public DepartmentListInOBJ: any = {}
  getDepartmentList() {
    this.http
      .get(this.connString + 'getDepartmentList')
      .subscribe((GetAllDepartmentList: any) => {
        this.testBool = false
        this.counter = 0

        while (this.testBool != true) {
          this.DepartmentListInOBJ = {}
          if (GetAllDepartmentList[this.counter] == undefined) {
            this.testBool = true
          }
          if (GetAllDepartmentList[this.counter] != undefined) {
            this.DepartmentListInOBJ.DepartmentList = GetAllDepartmentList[this.counter]
            this.DepartmentListOBJ.push(this.DepartmentListInOBJ)
          }
          this.counter++
        }
      })
    return this.DepartmentListOBJ
  }
}
