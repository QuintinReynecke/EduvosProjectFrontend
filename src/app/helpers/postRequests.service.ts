import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { httpConfig } from './httpConfig'
import { insertMod } from './DatabaseConnection/DataModel'
// import { insertModServiceList } from './DatabaseConnection/DataModelServiceList'

@Injectable({
  providedIn: 'root',
})
export class PostRequestsService {
  private ConnURL: any = this.myHTTPrequests.GetConnURL()

  constructor(
    private http: HttpClient,
    private myHTTPrequests: httpConfig
  ) {}

  DataModel: insertMod = {} as any
  // DataModelService: insertModServiceList = {} as any

  // ID's for tables
  public MainTableAddingID: any

  async RequestNewJob(
    userId: any,
    title: any,
    descriptionJR: any,
    location: any,
    category:any,
    dateRequested: any,
    sendQuoteTo: any,
    status: any,
    MainTableAddingID: any
  ) {
    this.DataModel.JobRequest = {
      UserId: userId,
      Title: title,
      Description: descriptionJR,
      Location: location,
      SubCategory: category,
      DateRequested: dateRequested,
      AttachedQuote: 'null',
      SendQuoteTo: sendQuoteTo,
      Status: status,
      Rating: 0,
      ReviewComment: '',
      mainTableFKId: MainTableAddingID,
    }

    try {
      await this.http
        .post(`${this.ConnURL}CreateJobRequest`, this.DataModel.JobRequest)
        .toPromise()
      alert('The request for the quote has been sent.')
    } catch (error) {
      console.error('Error requesting new job:', error)
      alert(
        'There was an error sending the request for the quote. Please try again later.'
      )
    }
  }

  async addUser(username: string, password: string, type: string) {
    // Resetting to the current date
    try {
      const userInfoAdding: any = await this.http
        .get(`${this.ConnURL}getUserName/${username}`)
        .toPromise()
      this.MainTableAddingID = userInfoAdding[0].id

      this.DataModel.ContactDetailsTable = {
        Phone: 'N/A',
        Website: 'N/A',
        Email: 'N/A',
        Address: 'N/A',
        Location: 'N/A',
        mainTableFKId: this.MainTableAddingID,
      }

      this.DataModel.BusinessHoursTable = {
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false,
        mainTableFKId: this.MainTableAddingID,
      }

      this.DataModel.WorkLocationTable = {
        workInCountry: null,
        province: null,
        suburb: null,
        mainTableFKId: this.MainTableAddingID,
      }

      this.DataModel.UserTable = {
        isCertified: false,
        proofOfCertification: '',
        mainTableFKId: this.MainTableAddingID,
      }

      this.DataModel.CategoryTable = {
        Category: null,
        SubCategory: null,
        mainTableFKId: this.MainTableAddingID,
      }

      const currentDate = new Date() // Current date and time
      const futureDate = new Date() // Clone the current date
      futureDate.setDate(currentDate.getDate() + 30) // Add 30 days

      this.DataModel.SubscriptionTable = {
        SubscriptionType: 'Premium',
        SubscriptionStartDate: currentDate,
        SubscriptionEndDate: futureDate,
        AutoRenew: false,
        Price: 0,
        mainTableFKId: this.MainTableAddingID,
      }

      await Promise.all([
        this.http
          .post(
            `${this.ConnURL}InsertNewUserContactDetails`,
            this.DataModel.ContactDetailsTable
          )
          .toPromise(),
        this.http
          .post(
            `${this.ConnURL}InsertNewUserBussinesH`,
            this.DataModel.BusinessHoursTable
          )
          .toPromise(),
        this.http
          .post(
            `${this.ConnURL}InsertNewCategory`,
            this.DataModel.CategoryTable
          )
          .toPromise(),
        this.http
          .post(
            `${this.ConnURL}InsertNewSubscription`,
            this.DataModel.SubscriptionTable
          )
          .toPromise(),
        this.http
          .post(
            `${this.ConnURL}InsertNewUserWorkLocations`,
            this.DataModel.WorkLocationTable
          )
          .toPromise(),
        this.http
          .post(`${this.ConnURL}InsertNewUserUsers`, this.DataModel.UserTable)
          .toPromise(),
      ])
    } catch (error) {
      console.error('Error adding user data:', error)
    }
  }

  SendEmailToServiceProvider(
    Subject: any,
    UserBody: any,
    ToPerson: any = null,
    Attachment: any = null,
    FileName: any = null
  ) {
    if (Attachment != null) {
      Attachment = Attachment.split(',')[1]
    }

    if (FileName == null) {
      FileName = 'quote.pdf'
    }

    const payload = {
      subject: Subject,
      body: UserBody,
      ToPerson: ToPerson,
      attachment: Attachment, // base64 string of the PDF
      fileName: FileName, // file name of the PDF
    }
    this.http
      .post(this.ConnURL + 'sendMailServicePage', payload)
      .subscribe((data) => {
        alert('Your message was sent to ' + ToPerson)
      })
  }
}
