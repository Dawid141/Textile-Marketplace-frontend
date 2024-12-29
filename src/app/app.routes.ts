import { Routes } from '@angular/router';
import {RegisterComponent} from './components/auth/register/register.component';
import {LoginComponent} from './components/auth/login/login.component';
import {AccountActivationComponent} from './components/auth/account-activation/account-activation.component';
import {SubmitPasswordResetComponent} from './components/auth/submit-password-reset/submit-password-reset.component';
import {PasswordResetComponent} from './components/auth/password-reset/password-reset.component';


export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'account-activation', component: AccountActivationComponent},
  {path: 'submit-password-reset', component: SubmitPasswordResetComponent},
  {path: 'password-reset', component: PasswordResetComponent}
];
