import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {HashLocationStrategy, LocationStrategy, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AdminPageComponent} from './components/admin-page/admin-page.component';
import {NavBarComponent} from "./components/nav-bar/nav-bar.component";
import {JwtModule} from "@auth0/angular-jwt";
import {AlertPopUpComponent} from './components/alert-pop-up/alert-pop-up.component';
import {UserPageComponent} from './components/user-page/user-page.component';
import {ErrorPageComponent} from './components/error-page/error-page.component';
import {TableComponent} from './components/table/table.component';
import {ButtonComponent} from './components/button/button.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {AddEditUserComponent} from "./components/add-edit-user/add-edit-user.component";
import { AddEditDeviceComponent } from './components/add-edit-device/add-edit-device.component';
import { AlertComponent } from './components/alert/alert.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminPageComponent,
    NavBarComponent,
    AlertPopUpComponent,
    UserPageComponent,
    ErrorPageComponent,
    TableComponent,
    ButtonComponent,
    AddEditUserComponent,
    AddEditDeviceComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    FormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NoopAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => sessionStorage.getItem('access_token')
      }
    }),
    NgSelectModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
