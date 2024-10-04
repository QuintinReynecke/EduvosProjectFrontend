import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './helpers/auth-interceptor.service';
import { httpConfig } from './helpers/httpConfig'
import { MySharedService } from './helpers/MySharedService'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor, // Your interceptor to handle JWT token
      multi: true, // Important for adding multiple interceptors if needed
    },
    httpConfig,
    MySharedService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
