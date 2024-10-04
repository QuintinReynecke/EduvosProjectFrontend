import { Injectable } from '@angular/core'

@Injectable()
export class MySharedService {

  public SelectedGroupName: any;
 
  getGroupName() {
    return this.SelectedGroupName
  }

  setGroupNameVAL(value: any) {
    this.SelectedGroupName = value
  }

}
