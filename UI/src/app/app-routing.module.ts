import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';
import { ForgotPasswordComponent } from './shared/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './shared/change-password/change-password.component';
import { HomeComponent } from './main/home/home.component';
import { AuthGuard } from './auth.guard';
import { NavbarComponent } from './shared/navbar/navbar.component';

const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full", canActivate: [AuthGuard] },  
  { path: "auth/login", component: LoginComponent, pathMatch: "full" },
  { path: "auth/register", component: RegisterComponent, pathMatch: "full" },
  { path: "auth/forgot-password", component: ForgotPasswordComponent, pathMatch: "full" },
  { path: "auth/change-password", component: ChangePasswordComponent, pathMatch: "full" },
  { path: "auth/navbar", component: NavbarComponent, pathMatch: "full", canActivate: [AuthGuard] },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
