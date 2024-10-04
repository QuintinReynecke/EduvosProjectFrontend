import { AuthService } from './authService.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { httpConfig } from './httpConfig';
import { insertMod } from './DatabaseConnection/DataModel';

@Injectable({
  providedIn: 'root',
})
export class PutRequestsService {
  private ConnURL: any = this.myHTTPrequests.GetConnURL();

  constructor(
    private http: HttpClient,
    private myHTTPrequests: httpConfig,
    private authService: AuthService
  ) {}

  DataModel: insertMod = {} as any;

  async updateUser(
    profileIDValue: any,
    profilePicture: any,
    username: any,
    password: any,
    name: any,
    type: any,
    department: any,
    groupSelectMenu:any,
  ) {
    this.DataModel.MainTable = {
      Id: profileIDValue,
      ProfilePicture: profilePicture,
      UserName: username,
      Password: password,
      Name: name,
      Type: type,
      Department: department,
      Groups:groupSelectMenu,
      RefreshToken: this.authService.getRefreshToken(),
      RefreshTokenExpiration: this.authService.getTokenExpiration(),
    };

    try {
      await this.http
        .put(`${this.ConnURL}Update/UserDetailsMain`, this.DataModel.MainTable)
        .toPromise()
      alert('Details updated.')
    } catch (error) {
      console.error('Error updating details: ', error)
      alert(
        'There was an error updating details. Please try again later.'
      )
    }
  }
}
