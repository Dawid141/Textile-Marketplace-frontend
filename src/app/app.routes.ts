import { Routes } from '@angular/router';
import {ProductsComponent} from './components/products-main-site/products.component';
import {MyAccountComponent} from './components/my-account/my-account.component';
import {ContactComponent} from './components/contact/contact.component';
import {SingleOfferComponent} from './components/single-offer/single-offer/single-offer.component';
import {MyOrdersComponent} from './components/my-orders/my-orders.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {LoginComponent} from './components/auth/login/login.component';
import {AccountActivationComponent} from './components/auth/account-activation/account-activation.component';
import {SubmitPasswordResetComponent} from './components/auth/submit-password-reset/submit-password-reset.component';
import {PasswordResetComponent} from './components/auth/password-reset/password-reset.component';
import {MyOffersComponent} from './components/my-offers/my-offers.component';


export const routes: Routes = [
  {path: 'products', component: ProductsComponent},
  {path: 'main-page', component: SingleOfferComponent},
  {path: 'my-account', component: MyAccountComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'my-orders', component: MyOrdersComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'account-activation', component: AccountActivationComponent},
  {path: 'submit-password-reset', component: SubmitPasswordResetComponent},
  {path: 'password-reset', component: PasswordResetComponent},
  {path: 'my-offers', component: MyOffersComponent},
  {path: 'single-offer', component: SingleOfferComponent}
];
