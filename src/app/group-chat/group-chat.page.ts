import { Component, OnInit } from '@angular/core';
import { GetRequestsService } from '../helpers/getRequests.service';
import { MySharedService } from '../helpers/MySharedService';
import { AuthService } from '../helpers/authService.service';
import { PostRequestsService } from '../helpers/postRequests.service';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.page.html',
  styleUrls: ['./group-chat.page.scss'],
})
export class GroupChatPage implements OnInit {
  constructor(
    private getRequestsService: GetRequestsService,
    private myService: MySharedService,
    private authService: AuthService,
    private postRequestsService: PostRequestsService
  ) {}

  public groupSelected: any;
  public groupSelectedID: any;
  public messages: any[] = [];
  public newMessage: string = '';
  public groupName: any = this.myService.getGroupName();

  async ngOnInit() {
    console.log("groupName")
    
    console.log(this.groupName)
    this.getGroupID(this.groupName);
    
  }

  ionViewWillEnter() {
    // Fetch data every time the view is about to enter
    const groupName = this.myService.getGroupName();
    this.getGroupID(groupName);
  }

  

  async getGroupID(groupName: any) {
    try {
      const groupID = await this.getRequestsService
        .getGroupID(groupName)
        .toPromise();
      if (groupID && groupID.length > 0) {
        console.log(groupID)
        this.messages = []; 
        this.groupSelectedID = groupID[0].id;
        this.getGroupChatInfo(this.groupSelectedID);
      }
    } catch (error) {
      console.error('Failed to load Group', error);
    }
  }

  async getGroupChatInfo(groupID: number) {
    try {
      const chatInfo = await this.getRequestsService
        .getGroupChatInfo(groupID)
        .toPromise();
      this.messages = chatInfo;
    } catch (error) {
      console.error('Failed to load Group Chat Info', error);
    }
  }

  isSender(message: any): boolean {
    // Assuming the sender info is stored in the message and matches current user's ID or name
    const currentUser = this.authService.getUsername(); // Adjust based on how you're storing user info
    return message.SenderName === currentUser;
  }

  async sendMessage() {
    if (!this.newMessage.trim()) return; // Prevent sending empty messages

    try {// Assuming the group ID is stored in groupSelected

      const messagePayload = {
        GroupId: this.groupSelectedID,
        Message: this.newMessage,
        SenderId: this.authService.getProfileID(), // Assuming the current user has an ID
      };

      await this.postRequestsService.sendMessage(messagePayload).toPromise();

      // Optionally push the message into the chat view without re-fetching
      this.messages.push({
        message: this.newMessage,
        DateAdded: new Date(),
        SenderName: this.authService.getUsername(),
      });

      this.newMessage = ''; // Clear the input field
    } catch (error) {
      console.error('Failed to send message', error);
    }
  }
}
