// This file is use to auto authenticate, It will send in the auth token through as a header and auto renew the token once expired
import { Injectable } from '@angular/core'
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http'
import { Observable, throwError, BehaviorSubject } from 'rxjs'
import { catchError, switchMap, filter, take } from 'rxjs/operators'
import { AuthService } from './authService.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private refreshingToken = false
  private tokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null)

  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getAccessToken()
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`, // Add access token to the header
      },
    })

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !this.refreshingToken) {
          if (!this.tokenSubject.value) {
            this.refreshToken()
          }
          return this.tokenSubject.pipe(
            filter((token) => token != null),
            take(1),
            switchMap(() => {
              const newAccessToken = this.authService.getAccessToken()
              const retryReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newAccessToken}`,
                },
              })
              return next.handle(retryReq)
            })
          )
        }
        return throwError(error)
      })
    )
  }

  private refreshToken() {
    this.refreshingToken = true
    this.authService.refreshToken().subscribe(
      (token) => {
        this.tokenSubject.next(token)
        this.refreshingToken = false
      },
      (error) => {
        this.refreshingToken = false
        this.tokenSubject.next(null)
        console.error('Token refresh failed:', error)
      }
    )
  }
}
