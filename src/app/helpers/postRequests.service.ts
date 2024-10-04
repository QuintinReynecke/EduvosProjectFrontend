import { AuthService } from './authService.service';
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { httpConfig } from './httpConfig'
import { insertMod } from './DatabaseConnection/DataModel'
import { Observable } from 'rxjs';
// import { insertModServiceList } from './DatabaseConnection/DataModelServiceList'

@Injectable({
  providedIn: 'root',
})
export class PostRequestsService {
  private ConnURL: any = this.myHTTPrequests.GetConnURL()

  constructor(
    private http: HttpClient,
    private myHTTPrequests: httpConfig,
    private authService: AuthService
  ) {}

  DataModel: insertMod = {} as any
  // DataModelService: insertModServiceList = {} as any

  // ID's for tables

  async newPersonalChat(
    facultyType: any,
    question: any,
    department: any
  ) {
    const currentDate = new Date();
    this.DataModel.PersonalChatsTable = {
      facultyType: facultyType,
      question: question,
      answer: "",
      department: department,
      DateAdded: currentDate,
      mainTableFKId: this.authService.getProfileID(),
    }

    try {
      await this.http
        .post(`${this.ConnURL}createNewChat`, this.DataModel.PersonalChatsTable)
        .toPromise()
      alert(`New chat created, waiting for ${facultyType} to respond.`)
    } catch (error) {
      console.error('Error creating new chat:', error)
      alert(
        'There was an error creating an new chat. Please try again later.'
      )
    }
  }

  sendMessage(messagePayload: any): Observable<any> {
    return this.http.post(`${this.ConnURL}sendMessage`, messagePayload);
  }
}
