import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { httpConfig } from './httpConfig'

@Injectable({
  providedIn: 'root',
})
export class DeleteRequestsService {
  private connString: any = this.myHTTPrequests.GetConnURL()

  constructor(
    private http: HttpClient,
    private myHTTPrequests: httpConfig
  ) {}

  async DeleteJobRequests(Record: any) {
    try {
      await this.http
        .delete(`${this.connString}DeleteJobRequests/${Record}`)
        .toPromise()
      console.log('Job request deleted successfully')
      alert('Job request deleted successfully')
    } catch (error) {
      console.error('Error deleting job request:', error)
      alert(
        'There was an error deleting the job request. Please try again later.'
      )
    }
  }

  async DeleteUser(Record: any) {
    try {
      await this.http
        .delete(`${this.connString}DeleteUser/${Record}`)
        .toPromise()
      console.log('User deleted successfully')
      alert('User deleted successfully')
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('There was an error deleting the user. Please try again later.')
    }
  }

  async DeleteService(Record: any) {
    try {
      await this.http
        .delete(`${this.connString}DeleteServiceListType/${Record}`)
        .toPromise()
      console.log('Service deleted successfully')
      alert('Service deleted successfully')
    } catch (error) {
      console.error('Error deleting service:', error)
      alert('There was an error deleting the service. Please try again later.')
    }
  }

  async DeleteFavorite(Record: any) {
    try {
      await this.http
        .delete(`${this.connString}DeleteFavorite/${Record}`)
        .toPromise()
      console.log('Favorite Removed successfully')
      alert('Favorite Removed successfully')
    } catch (error) {
      console.error('Error Removing favorite:', error)
      alert('There was an error deleting the favorite. Please try again later.')
    }
  }
}
