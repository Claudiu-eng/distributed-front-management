import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {AdminPageComponent} from "./components/admin-page/admin-page.component";
import {ErrorPageComponent} from "./components/error-page/error-page.component";
import {UserPageComponent} from "./components/user-page/user-page.component";
import {AdminAuthGuard} from "./components/authenticator/AdminAuthGuard";
import {UserAuthGuard} from "./components/authenticator/UserAuthGuard";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'admin', component: AdminPageComponent ,canActivate: [AdminAuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserPageComponent ,canActivate: [UserAuthGuard]},
  { path: 'error', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
