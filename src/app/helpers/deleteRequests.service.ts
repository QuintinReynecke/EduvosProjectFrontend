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

}
