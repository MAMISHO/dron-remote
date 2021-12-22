import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { LayoutComponent } from './modules/layout/layout.component';
import { NavigationComponent } from './modules/layout/nav/navigation.component';
import { SidebarComponent } from './modules/layout/sidebar/sidebar.component';
import { BreadcrumbComponent } from './modules/layout/breadcrumb/breadcrumb.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './modules/pages/dashboard/dashboard.component';
import { NopagefoundComponent } from './modules/pages/nopagefound/nopagefound.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { DevicesComponent } from './modules/components/device/devices/devices.component';
import { DevicesListComponent } from './modules/components/device/devices-list/devices-list.component';
import { AuthInterceptor } from './modules/auth/auth.interceptor';
import { UserDevicesComponent } from './modules/pages/user-devices/user-devices.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LayoutComponent,
    NavigationComponent,
    SidebarComponent,
    BreadcrumbComponent,
    DashboardComponent,
    NopagefoundComponent,
    DevicesComponent,
    DevicesListComponent,
    UserDevicesComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
	  PerfectScrollbarModule,
    NgbModule,
    // RouterModule.forRoot(Approutes, { useHash: false, relativeLinkResolution: 'legacy' })
  ],
  providers: [
      { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
      JwtHelperService,
      { provide : HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi : true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
