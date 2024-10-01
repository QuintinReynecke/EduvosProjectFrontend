import { Injectable } from '@angular/core'
// import { insertMod } from './DatabaseConnection/DataModel'
// import { insertModServiceList } from './DatabaseConnection/DataModelServiceList'

@Injectable()
export class httpConfig {
  constructor() {}

  // TODO: Cleanup file

  // DataModel: insertMod = {} as any
  // DataModelService: insertModServiceList = {} as any

  // Default connect to server - AWS
  // public ConnURL: any =
  //   'https://idf4zurwtl.execute-api.us-east-1.amazonaws.com/';

  // LOCAL HOST
  public ConnURL: any = 'https://localhost:5001/'

  // Made a rule for laptop to be a server: // REMEMBER TO DELETE THE INBOUND RULE FOR SECURITY
  // public ConnURL: any = 'http://192.168.0.104:5000/'

  // "applicationUrl": "http://192.168.0.104:5000;https://localhost:5001;http://localhost:5000"

  // Android studio emulator
  // public ConnURL: any = 'http://192.168.0.104:5000/'

  // ID's for tables
  public MainTableAddingID: any
  public MainTableID: any
  public ContactDetailsID: any
  public BusinessHoursID: any
  public PhotosID: any
  public WorkLocationsID: any
  public UsersID: any
  public ReviewID: any

  // To get Categories (Type of service Work)
  public counter: any
  public testBool: boolean = false
  public ServiceListOBJ: any = []
  public ServiceListInOBJ: any = {}

  // Get functions
  GetConnURL() {
    return this.ConnURL
  }
}
