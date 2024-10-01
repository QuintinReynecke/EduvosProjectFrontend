import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from './helpers/authService.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private cdRef: ChangeDetectorRef
  ) {}
  public ProfilePicture: any;

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.ProfilePicture = this.authService.getProfilePicture(); // Set the border color based on subscription type
    }

    // Listen for profile picture changes
    this.authService.profilePictureChanged.subscribe((profilePicture) => {
      this.ProfilePicture = profilePicture;
      this.cdRef.detectChanges(); // Trigger change detection manually
    });
  }
}
