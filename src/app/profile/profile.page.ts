import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor() { }

  loginShow:boolean = false

  profile = {
    name: 'John Doe',
    email: 'john.doe@vossie.net'
  };
  
  ngOnInit() {
  }

  test(){
    this.loginShow = true
  }

}
