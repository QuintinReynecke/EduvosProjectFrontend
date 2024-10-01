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

}
