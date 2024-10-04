import { Injectable } from '@angular/core'
// import { insertMod } from './DatabaseConnection/DataModel'
// import { insertModServiceList } from './DatabaseConnection/DataModelServiceList'

@Injectable()
export class httpConfig {
  constructor() {}

  // LOCAL HOST
  public ConnURL: any = 'https://localhost:5001/'

  // Get functions
  GetConnURL() {
    return this.ConnURL
  }
}
