import { AuthService } from './authService.service'
import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { httpConfig } from './httpConfig'
import { insertMod } from './DatabaseConnection/DataModel'

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

 
}
