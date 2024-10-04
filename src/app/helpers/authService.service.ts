import { EventEmitter, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { httpConfig } from './httpConfig'
import { BehaviorSubject, Observable, of, throwError } from 'rxjs'
import { filter, switchMap, catchError, take } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private connString: any = this.myHTTPrequests.GetConnURL()
  private refreshTokenInProgress = false // Track whether a token refresh is in progress
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  )

  constructor(
    private http: HttpClient,
    private router: Router,
    private myHTTPrequests: httpConfig
  ) {}

  login(username: string, password: string) {
    return this.http
      .post<{
        accessToken: string
        refreshToken: string
        username: string
        profilePicture: any
        id: any
        department:any
        userType: any
        refreshTokenExpiration: any
      }>(`${this.connString}login`, {
        UserName: username,
        Password: password,
      })
      .toPromise()
      .then((response:any) => {

        console.log(response)
        localStorage.setItem('accessToken', response.accessToken)
        localStorage.setItem('refreshToken', response.refreshToken)
        localStorage.setItem(
          'refreshTokenExpiration',
          response.refreshTokenExpiration
        )
        localStorage.setItem('userName', response.username)
        localStorage.setItem('profilePicture', response.profilePicture)
        localStorage.setItem('id', response.id)
        localStorage.setItem('userType', response.userType)
        localStorage.setItem('department', response.department)

        this.updateProfilePicture(response.profilePicture)

        alert(`Login Successfully, welcome ${response.username}!`)
      })
      .catch((err) => {
        console.error('Login failed', err)
        alert('Login failed. Please check your Username or Password!')
      })
  }

  // Get token from HttpOnly cookie
  // Fetch access token from localStorage or cookie
  getAccessToken(): string {
    return (
      localStorage.getItem('accessToken') ||
      'null'
    )
  }

  // Fetch refresh token from localStorage or cookie
  getRefreshToken(): string {
    return (
      localStorage.getItem('refreshToken') ||
      'null'
    )
  }

  getTokenExpiration(): any {
    return (
      localStorage.getItem('refreshTokenExpiration') ||
      'null'
    )
  }

  getDepartment(): any {
    return (
      localStorage.getItem('department') ||
      'null'
    )
  }

  getUserType(): any {
    return (
      localStorage.getItem('userType') ||
      'null'
    )
  }

  getProfileID(): any{
    return (
      localStorage.getItem('id') ||
      'null'
    )
  }

  // Refresh the access token using the refresh token
  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken()
    const accessToken = this.getAccessToken()
    const userName = this.getUsername() // Get username

    if (
      refreshToken === 'null' ||
      accessToken === 'null' ||
      userName === 'null'
    ) {
      console.error('Missing tokens or username')
      return throwError('Missing tokens or username')
    }

    // If a refresh is already in progress, abort further requests
    if (this.refreshTokenInProgress) {
      console.log('Refreshing token in progress, aborting function ...')
      return this.refreshTokenSubject.pipe(
        take(1),
        switchMap((token) => (token ? of(token) : throwError('Refresh failed')))
      )
    }

    // Set refresh process flag to true
    this.refreshTokenInProgress = true
    this.refreshTokenSubject.next(null)

    // Perform the refresh request
    return this.http
      .post<{
        accessToken: string
        refreshToken: string
        refreshTokenExpiration: any
      }>(
        `${this.connString}refresh-token`,
        {
          AccessToken: accessToken,
          RefreshToken: refreshToken,
          UserName: userName,
        },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .pipe(
        switchMap((response) => {
          // Store new tokens
          localStorage.setItem(
            'refreshTokenExpiration',
            response.refreshTokenExpiration
          )
          localStorage.setItem('accessToken', response.accessToken)
          localStorage.setItem('refreshToken', response.refreshToken)

          // Notify that refresh is complete
          this.refreshTokenSubject.next(response.accessToken)
          this.refreshTokenInProgress = false

          // Return the new access token
          return of(response.accessToken)
        }),
        catchError((error) => {
          this.refreshTokenInProgress = false
          this.refreshTokenSubject.next(null)
          console.error('Token refresh failed:', error)
          return throwError(error)
        })
      )
  }

  // Check if the token is expired
  isTokenExpired(token: string): boolean {
    if (!token || token === 'null') return true

    const tokenPayload = JSON.parse(atob(token.split('.')[1]))
    const expiryTime = tokenPayload.exp * 1000 // Convert to milliseconds
    return Date.now() > expiryTime
  }

  async registerUser(username: string, password: string, userType: string) {
    return this.http
      .post(`${this.connString}register`, {
        UserName: username,
        Password: password,
        Type: userType,
      })
      .toPromise()
      .then((response) => {
        console.log('Registration successful:', response)
        alert(
          'Registration successful. Please check your email for the verification code.'
        )
      })
      .catch((err) => {
        console.error('Registration failed:', err)
        alert( `Registration failed: ${err}`)
      })
  }

  async verifyEmail(email: string, verificationCode: string) {
    return this.http
      .post(`${this.connString}verify-email`, {
        Email: email,
        VerificationCode: verificationCode,
      })
      .toPromise()
      .then((response) => {
        console.log('Email verification successful:', response)
        alert('Email verification successful.')
      })
      .catch((err) => {
        console.error('Email verification failed:', err)
      })
  }

  getToken() {
    return localStorage.getItem('accessToken') || 'null'
  }

  getSubscriptionType(): string {
    return localStorage.getItem('subscriptionType') || 'normal' // Default to 'normal' if not found
  }

  getProfilePicture(): string {
    return localStorage.getItem('profilePicture') || 'default-profile-pic-url'
  }
  // Observable to hold the profile picture URL
  profilePictureChanged = new EventEmitter<string>()

  updateProfilePicture(newProfilePicture: string) {
    localStorage.setItem('profilePicture', newProfilePicture)
    this.profilePictureChanged.emit(newProfilePicture) // Emit the event
  }

  profileSubscriptionChanged = new EventEmitter<string>()

  updateProfileSubscription(newProfileSubscription: string) {
    localStorage.setItem('subscriptionType', newProfileSubscription)
    this.profileSubscriptionChanged.emit(newProfileSubscription) // Emit the event
  }

  getUserId() {
    return localStorage.getItem('id')
  }

  getUsername() {
    return localStorage.getItem('userName')
  }

  logout() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userName')
    localStorage.removeItem('profilePicture')
    localStorage.removeItem('id')
    localStorage.removeItem('department')
    localStorage.removeItem('userType')
    this.updateProfilePicture('')
    this.updateProfileSubscription('')
  }

  isAuthenticated(): boolean {
    return (
      !!localStorage.getItem('accessToken')
    )
  }

  // Forgot password

  // Method to request a password reset (sends verification code)
  requestPasswordReset(email: string) {
    return this.http
      .post(`${this.connString}forgot-password`, { Email: email })
      .toPromise()
      .then((response) => {
        console.log('Verification code sent:', response)
        alert('Verification code sent.')
      })
      .catch((err) => {
        console.log('Password reset email sent status: ', err)
      })
  }

  // Method to reset the password using the verification code
  resetPassword(email: string, verificationCode: string, newPassword: string) {
    return this.http
      .post(`${this.connString}reset-password`, {
        Email: email,
        VerificationCode: verificationCode,
        NewPassword: newPassword,
      })
      .toPromise()
      .then((response) => {
        console.log('Password reset successful:', response)
        alert('Password reset successful.')
      })
      .catch((err) => {
        console.log('Password reset status: ', err)
      })
  }
}
