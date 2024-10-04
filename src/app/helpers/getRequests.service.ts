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

  getAllGroups(department:string): Observable<any> {
    return this.http.get(`${this.connString}getGroupsList/${department}`)
  }

  getUserInfo(userID: any): Observable<any> {
    return this.http.get(`${this.connString}getUserInfo/${userID}`)
  }

  getGroupChatInfo(groupID: any): Observable<any> {
    return this.http.get(`${this.connString}getGroupChatInfo/${groupID}`)
  }

  getGroupID(groupName: any): Observable<any> {
    return this.http.get(`${this.connString}getGroupID/${groupName}`)
  }

  getFAQListFilter(): Observable<string[]> {
    return this.http.get<any[]>(this.connString + 'getFAQList/ALL').pipe(
      map((GetAllFAQList) => {
        return GetAllFAQList.map(
          (FAQ) => FAQ?.department // Filter by subcategory
        ).filter(Boolean)
      })
    )
  }

  getFAQList(department: string) {
    // Clear FAQListOBJ here to avoid duplicates
    this.FAQListOBJ = [];
    this.http
      .get(this.connString + 'getFAQList/' + department)
      .subscribe((GetAllFAQList: any) => {
        this.testBool = false;
        this.counter = 0;
        // Loop through and push each FAQ to the list
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
    // Return the FAQ list after it has been updated
    return this.FAQListOBJ;
  }

  getGroupsList(department: string) {
    this.GroupsListOBJ = [];
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
    this.SubjectListOBJ = [];
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

  getDepartmentListFilter(): Observable<string[]> {
    return this.http.get<any[]>(this.connString + 'getDepartmentList').pipe(
      map((GetAllDepartmentList) => {
        return GetAllDepartmentList.map(
          (Department) => Department?.name // Filter by subcategory
        ).filter(Boolean)
      })
    )
  }

  getDepartmentList() {
    this.DepartmentListOBJ = [];
    this.http
      .get(this.connString + 'getDepartmentList')
      .subscribe((GetAllDepartmentList: any) => {
        console.log(GetAllDepartmentList)
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
