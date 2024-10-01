import { AuthService } from './authService.service'
import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { httpConfig } from './httpConfig'
import { insertMod } from './DatabaseConnection/DataModel'
import { insertModServiceList } from './DatabaseConnection/DataModelServiceList'

@Injectable({
  providedIn: 'root',
})
export class PutRequestsService {
  private ConnURL: any = this.myHTTPrequests.GetConnURL()

  constructor(
    private http: HttpClient,
    private myHTTPrequests: httpConfig,
    private authService: AuthService
  ) {}

  DataModel: insertMod = {} as any
  DataModelService: insertModServiceList = {} as any

 
  // TODO: add auth for post requests

  // Put functions
  async UpdateJobRequest(
    JobID: any,
    userId: any,
    title: any,
    descriptionJR: any,
    location: any,
    category:any,
    dateRequested: any,
    attachedQuote: any,
    sendQuoteTo: any,
    status: any,
    rating: number,
    comment: any,
    MainTableAddingID: any
  ) {
    this.DataModel.JobRequest = {
      Id: JobID,
      UserId: userId,
      Title: title,
      Description: descriptionJR,
      Location: location,
      SubCategory: category,
      DateRequested: dateRequested,
      AttachedQuote: attachedQuote,
      SendQuoteTo: sendQuoteTo,
      Status: status,
      Rating: rating,
      ReviewComment: comment,
      mainTableFKId: MainTableAddingID,
    }

    try {
      await this.http
        .put(`${this.ConnURL}Update/JobRequests`, this.DataModel.JobRequest)
        .toPromise()
      alert('Job Request has been updated.')
    } catch (error) {
      console.error('Error updating job request:', error)
      alert(
        'There was an error updating the job request. Please try again later.'
      )
    }
  }

  async UpdateAllUserDetails(
    profileIDValue: any,
    username: any,
    password: any,
    profilePic: any,
    name: any,
    type: any,
    rating: any,
    subcategoriesMap: { [s: string]: string[] } | ArrayLike<string[]>, // Add subcategories
    description: any,
    callOutFee: any,
    active: boolean,
    totalPhotos: any,
    MainTableID: any,
    ContactDetailsID: any,
    BusinessHoursID: any,
    CategoryID: any,
    WorkLocationsID: any,
    UsersID: any,
    phone: any,
    website: any,
    email: any,
    BusinessLocation: any,
    monday: boolean,
    tuesday: boolean,
    wednesday: boolean,
    thursday: boolean,
    friday: boolean,
    saturday: boolean,
    sunday: boolean,
    selectedCountry: any,
    locationMap: { [s: string]: string[] } | ArrayLike<string[]>,
    isCertified: boolean,
    proofOfCertification: any
  ) {
    // Refresh token if needed
    const accessToken = this.authService.getAccessToken()

    // Check if token is expired or about to expire
    if (this.authService.isTokenExpired(accessToken)) {
      console.log('Access token expired, refreshing...')
      await this.authService.refreshToken().toPromise()
    }

    // Populate objects for each table
    const mainTableData = {
      Id: profileIDValue,
      UserName: username,
      Password: password,
      ProfilePicture: profilePic,
      Name: name,
      Type: type,
      Rating: rating,
      Description: description,
      CallOutFee: callOutFee,
      Active: active,
      TotalPhotos: totalPhotos,
      RefreshToken: this.authService.getRefreshToken(),
      RefreshTokenExpiration: this.authService.getTokenExpiration(),
    }

    const contactDetailsData = {
      Id: ContactDetailsID,
      Phone: phone,
      Website: website,
      Email: email,
      Address: 'N/A',
      Location: BusinessLocation,
      mainTableFKId: MainTableID,
    }
    const businessHoursData = {
      Id: BusinessHoursID,
      Monday: monday,
      Tuesday: tuesday,
      Wednesday: wednesday,
      Thursday: thursday,
      Friday: friday,
      Saturday: saturday,
      Sunday: sunday,
      mainTableFKId: MainTableID,
    }

    // Extract categories and subcategories as comma-separated strings
    const categories = (Object.keys(subcategoriesMap) as string[]).join('", "')
    const subcategories = (Object.values(subcategoriesMap) as string[][])
      .map((subs) => subs.join(', '))
      .join('"#" "')

    const categoryData = {
      Id: CategoryID,
      Category: categories,
      SubCategory: subcategories,
      mainTableFKId: MainTableID,
    }

    // Extract provinces and suburbs as comma-separated strings
    const provinces = (Object.keys(locationMap) as string[]).join('", "')
    const suburbs = (Object.values(locationMap) as string[][])
      .map((subs) => subs.join(', '))
      .join('"#" "')

    const workLocationData = {
      Id: WorkLocationsID,
      workInCountry: selectedCountry,
      province: `${provinces}`,
      suburb: `${suburbs}`,
      mainTableFKId: MainTableID,
    }

    const userData = {
      Id: UsersID,
      isCertified: isCertified,
      proofOfCertification: proofOfCertification,
      mainTableFKId: MainTableID,
    }

    // Array to hold promises
    const updatePromises = []

    updatePromises.push(
      this.http
        .put(this.ConnURL + 'Update/UserDetailsMain', mainTableData)
        .toPromise()
    )
    updatePromises.push(
      this.http
        .put(
          this.ConnURL + 'Update/UserDetailsContactDetails',
          contactDetailsData
        )
        .toPromise()
    )
    updatePromises.push(
      this.http
        .put(this.ConnURL + 'Update/CategoryDetails', categoryData)
        .toPromise()
    )
    updatePromises.push(
      this.http
        .put(this.ConnURL + 'Update/UserDetailsBussinesH', businessHoursData)
        .toPromise()
    )
    updatePromises.push(
      this.http
        .put(this.ConnURL + 'Update/UserDetailsWorkLocations', workLocationData)
        .toPromise()
    )
    updatePromises.push(
      this.http
        .put(this.ConnURL + 'Update/UserDetailsUsers', userData)
        .toPromise()
    )

    // Wait for all promises to resolve
    await Promise.all(updatePromises)
    this.authService.updateProfilePicture(profilePic)
  }

  async UpdateService(Record: number, Category: any, Subcategory: any) {
    this.DataModelService.Id = Record
    // this.DataModelService.TypeOfService = ServiceType
    this.DataModelService.Category = Category
    this.DataModelService.Subcategory = Subcategory

    try {
      await this.http
        .put(
          `${this.ConnURL}Update/UpdateNewServiceType`,
          this.DataModelService
        )
        .toPromise()
      console.log('Service updated successfully')
    } catch (error) {
      console.error('Error updating service:', error)
      alert('There was an error updating the service. Please try again later.')
    }
  }

  async AddToFavorites(UserName: any, UserID: any, MainTableAddingID: any) {
    this.DataModel.Favorites = {
      ServiceUserName: UserName,
      ServiceUserID: UserID,
      mainTableFKId: MainTableAddingID,
    }

    try {
      await this.http
        .put(`${this.ConnURL}AddToFavorites`, this.DataModel.Favorites)
        .toPromise()
      alert('Added to your favorites')
    } catch (error) {
      console.error('Error adding to favorites: ', error)
      alert(
        'There was an error adding to your favorites. Please try again later.'
      )
    }
  }

  async UpdateSubscription(
    SubscriptionId: any,
    SubscriptionType: any,
    SubscriptionStartDate: any,
    SubscriptionEndDate: any,
    AutoRenew: any,
    Price: any,
    MainTableAddingID: any
  ) {
    // Refresh token if needed
    const accessToken = this.authService.getAccessToken()

    // Check if token is expired or about to expire
    if (this.authService.isTokenExpired(accessToken)) {
      console.log('Access token expired, refreshing...')
      await this.authService.refreshToken().toPromise()
    }

    this.DataModel.SubscriptionTable = {
      Id: SubscriptionId,
      SubscriptionType: SubscriptionType,
      SubscriptionStartDate: SubscriptionStartDate,
      SubscriptionEndDate: SubscriptionEndDate,
      AutoRenew: AutoRenew,
      Price: Price,
      mainTableFKId: MainTableAddingID,
    }

    try {
      await this.http
        .put(
          `${this.ConnURL}UpdateSubscription`,
          this.DataModel.SubscriptionTable
        )
        .toPromise()
      alert(`Subscription Updated to ${SubscriptionType}`)
    } catch (error) {
      console.error('Error updating subscription: ', error)
      alert('There was an error updating subscription. Please try again later.')
    }
  }
}
