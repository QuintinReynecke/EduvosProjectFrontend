import { PutRequestsService } from '../helpers/putRequests.service';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../helpers/authService.service';
import { AlertController } from '@ionic/angular';
import { PostRequestsService } from '../helpers/postRequests.service';
import { LoadingController } from '@ionic/angular';
import { GetRequestsService } from '../helpers/getRequests.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  constructor(
    private loadingController: LoadingController,
    public alertController: AlertController,
    private router: Router,
    private authService: AuthService,
    private postRequestsService: PostRequestsService,
    private putRequestsService: PutRequestsService,
    private getRequestsService: GetRequestsService
  ) {}

  loginShow: boolean = false;

  username: any;
  name: any;
  profilePicture: any;
  department: any;
  userType: any;
  password: any;
  confirmPassword: any;
  public ShowLogoutFooter: boolean = false;

  //Service Type list Var
  public pdfUrl: any;
  public HideShowTC = false;
  public TandC: any;

  public DepartmentListOBJ: any[] = [];

  // Groups
  groupSelectMenu: any;

  ngOnInit() {
    this.checkAuthentication();
    this.getRequestsService
      .getDepartmentListFilter()
      .pipe(debounceTime(300)) // Adding debounce to avoid quick successive calls
      .subscribe((Department: any) => {
        this.DepartmentListOBJ = Department;
      });
  }

  ionViewWillEnter() {
    this.checkAuthentication();
    this.getRequestsService
      .getDepartmentListFilter()
      .pipe(debounceTime(300)) // Adding debounce to avoid quick successive calls
      .subscribe((Department: any) => {
        this.DepartmentListOBJ = Department;
      });
  }

  ngAfterViewInit() {
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const isAuthenticated = this.authService.isAuthenticated();

    if (!isAuthenticated) {
      // User is not authenticated, redirect to the login page
      this.signOut();
      return;
    } else {
      // User is on the login page and authenticated, redirect to the logged-in page
      this.username = this.authService.getUsername();
      this.profilePicture = this.authService.getProfilePicture();
      this.department = this.authService.getDepartment();
      this.userType = this.authService.getUserType();
      this.loginShow = true;
      this.ShowLogoutFooter = true;
      await this.loadGroups();
      await this.getUserInformation();
    }
  }

  async getUserInformation() {
    try {
      const userInfo = await this.getRequestsService
        .getUserInfo(this.authService.getProfileID())
        .toPromise();
      if (userInfo) {
        this.profilePicture = userInfo[0].profilePicture;
        this.name = userInfo[0].name;
        this.password = userInfo[0].password;
        this.userType = userInfo[0].type;
        this.department = userInfo[0].department;

        // Clean up escape characters from groups strings
        const cleanedGroups = userInfo[0].groups
          .replace(/\\\"/g, '')
          .split('", "')
          .map((groups: string) => groups.trim())
          .filter((groups: string) => groups.length > 0); // Filter out empty groups

        this.selectedGroup = cleanedGroups;
        console.log('cleanedGroups');
        console.log(this.selectedGroup);
      }
    } catch (error) {
      console.error('Failed to fetch user details', error);
    }
  }

  public signOut(): void {
    this.authService.logout();
    this.loginShow = false;
    this.ShowLogoutFooter = false;
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading data...',
      spinner: 'crescent',
      backdropDismiss: true,
    });
    await loading.present();
  }

  async dismissLoading() {
    await this.loadingController.dismiss();
  }

  ShowLogin: boolean = true;
  //Login/ Register Color Button
  public LoginColor: any = '#039ef1';
  public RegisterColor: any = 'white';

  //Login error message
  public errorLoginMessage: any;
  public passwordValid: boolean = false;
  public passwordMessage: string = '';

  SwitchLoginRegister(SigninType: any) {
    if (SigninType == 'Login') {
      this.ShowLogin = true;
      this.LoginColor = '#039ef1';
      this.RegisterColor = 'white';
    } else if (SigninType == 'Register') {
      this.ShowLogin = false;
      this.LoginColor = 'white';
      this.RegisterColor = '#039ef1';
    }
  }

  async login() {
    if (!this.username || !this.password) {
      this.errorLoginMessage = 'Please enter valid login credentials.';
      return;
    }
    await this.presentLoading();
    this.authService
      .login(this.username, this.password)
      .then(() => {
        this.checkAuthentication();
        this.dismissLoading();
      })
      .catch((err) => {
        this.errorLoginMessage = 'Login failed. Please try again later.';
        console.error('Login error', err);
        this.checkAuthentication();
        this.dismissLoading();
      });
  }

  signUp() {
    this.validatePassword();
    if (!this.TandC || !this.passwordValid) this.promptValidCheck();
    else {
      if (this.confirmPassword != this.password) {
      } else {
        this.AddNewUser();
      }
    }
  }

  validatePassword() {
    const minLength = this.password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(this.password);
    const hasLowerCase = /[a-z]/.test(this.password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(this.password);

    this.passwordValid =
      minLength && hasUpperCase && hasLowerCase && hasSpecialChar;

    if (!minLength) {
      this.passwordMessage = 'Password must be at least 8 characters long.';
    } else if (!hasUpperCase) {
      this.passwordMessage =
        'Password must contain at least one uppercase letter.';
    } else if (!hasLowerCase) {
      this.passwordMessage =
        'Password must contain at least one lowercase letter.';
    } else if (!hasSpecialChar) {
      this.passwordMessage =
        'Password must contain at least one special character.';
    } else {
      this.passwordMessage = 'Password is valid.';
    }
  }

  async AddNewUser() {
    // Register user
    if (!this.username || !this.password || !this.userType) {
      alert('Please fill in all required fields.');
      return;
    }
    await this.presentLoading();
    this.authService
      .registerUser(this.username, this.password, this.userType)
      .then(() => {
        this.promptVerificationCode();
        this.dismissLoading();
      })
      .catch((err: any) => {
        alert('Registration failed. Please try again later.');
        this.dismissLoading();
      });
  }

  async promptVerificationCode() {
    let alert = await this.alertController.create({
      header: 'Enter Verification Code sent to your Email',
      inputs: [
        {
          name: 'VerificationCode',
          placeholder: 'Verification Code',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
        {
          text: 'Verify',
          handler: (data) => {
            this.verifyUserEmail(data.VerificationCode);
          },
        },
      ],
    });
    await alert.present();
  }

  verifyUserEmail(verificationCode: string) {
    this.authService
      .verifyEmail(this.username, verificationCode)
      .then(() => {
        this.confirmationMessage();
      })
      .catch((err) => {
        alert('Email verification failed. Please try again later.');
      });
  }

  async confirmationMessage() {
    let alert = await this.alertController.create({
      header:
        'Email verification successful, please login to go to your profile.',
      buttons: [
        {
          text: 'Login',
          handler: () => {
            this.ShowLogin = true;
            this.SwitchLoginRegister('Login');
            this.router.navigate(['/profilepage']);
          },
        },
      ],
    });
    await alert.present();
  }

  async promptValidCheck() {
    let alert = await this.alertController.create({
      header: 'Hint',
      message:
        'Please make sure everything is filled in and accept terms and conditions by clicking on the checkbox',
      buttons: [
        {
          text: 'Okay',
          role: 'Okay',
          handler: (data) => {
            // console.log('Okay clicked');
          },
        },
      ],
    });
    await alert.present();
  }

  termsAndConditionsBoxShow() {
    const termsAndConditionsBoxElement =
      document.getElementById('TermsAndConditions');

    if (termsAndConditionsBoxElement) {
      termsAndConditionsBoxElement.style.display = 'block';
      this.HideShowTC = true;
      this.pdfUrl = 'assets/TermsAndConditions.pdf';
    } else {
      console.error('Element with ID TermsAndConditions not found.');
    }
  }

  termsAndConditionsBoxHide() {
    const termsAndConditionsBoxElement =
      document.getElementById('TermsAndConditions');

    if (termsAndConditionsBoxElement) {
      termsAndConditionsBoxElement.style.display = 'none';
      this.HideShowTC = false;
    } else {
      console.error('Element with ID TermsAndConditions not found.');
    }
  }

  // zoom for pdf
  public zoom: number = 1.0;
  zoomIn() {
    this.zoom += 0.1;
  }

  zoomOut() {
    if (this.zoom > 0.1) {
      this.zoom -= 0.1;
    }
  }

  // profile Picture
  ProfilePicUpdate: any;
  loadProfilePicFromDevice(event: any) {
    //Read a single Photo
    const fileProfilePic = event.target.files[0];
    const readerProfilePic = new FileReader();
    readerProfilePic.readAsDataURL(fileProfilePic);

    readerProfilePic.onload = () => {
      this.ProfilePicUpdate = readerProfilePic.result;
      this.profilePicture = this.ProfilePicUpdate;
    };

    readerProfilePic.onerror = (error) => {
      console.log(error);
    };
  }

  // Groups selection
  async loadGroups() {
    try {
      const loadGroup = await this.getRequestsService
        .getAllGroups('Software Engineering')
        // .getAllGroups(this.department)
        .toPromise();

      if (loadGroup) {
        console.log(loadGroup);
        this.groupSelectMenu = loadGroup;
      }
    } catch (error) {
      console.error('Failed to load Group', error);
    }
  }

  previousGroup: string[] = [];
  selectedGroup: string[] = [];
  selectedSubGroupByCategory: { [key: string]: string[] } = {};

  // Handling category selection
  onSelectGroup() {
    const selectedGroup = this.selectedGroup;
    console.log('Selected Group:', selectedGroup);

    // Update previously selected Group
    this.previousGroup = [...selectedGroup];

    const groupsSelected = (this.selectedGroup as string[]).join('", "');
    console.log('groupsSelected : ');
    console.log(groupsSelected);
  }

  // Update User details
  updateUser() {
    this.putRequestsService.updateUser(
      this.authService.getProfileID(),
      this.profilePicture,
      this.username,
      this.password,
      this.name,
      this.userType,
      this.department,
      (this.selectedGroup as string[]).join('", "')
    );

    this.authService.updateProfilePicture(this.profilePicture);
  }
}
