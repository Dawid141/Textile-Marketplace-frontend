import { Routes } from '@angular/router';
import {ProductsComponent} from './components/products-main-site/products.component';
import {MyAccountComponent} from './components/my-account/my-account.component';
import {ContactComponent} from './components/contact/contact.component';
import {SingleOfferComponent} from './components/single-offer/single-offer.component';
import {MyOrdersComponent} from './components/my-orders/my-orders.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {LoginComponent} from './components/auth/login/login.component';
import {AccountActivationComponent} from './components/auth/account-activation/account-activation.component';
import {SubmitPasswordResetComponent} from './components/auth/submit-password-reset/submit-password-reset.component';
import {PasswordResetComponent} from './components/auth/password-reset/password-reset.component';
import {MyOffersComponent} from './components/my-offers/my-offers.component';
import {IsLoginGuard} from './guards/login.guard';
import {AddProductComponent} from './components/add-product/add-product.component';
import {ImageUploadComponent} from './components/image-upload/image-upload.component';


export const routes: Routes = [
  {path: 'products', component: ProductsComponent},
  {path: 'main-page', component: SingleOfferComponent},
  {path: 'my-account', component: MyAccountComponent, canActivate: [IsLoginGuard]},
  {path: 'contact', component: ContactComponent},
  {path: 'my-orders', component: MyOrdersComponent, canActivate: [IsLoginGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'account-activation', component: AccountActivationComponent},
  {path: 'submit-password-reset', component: SubmitPasswordResetComponent},
  {path: 'password-reset', component: PasswordResetComponent},
  {path: 'my-offers', component: MyOffersComponent, canActivate: [IsLoginGuard]},
  { path: 'single-offer/:id', component: SingleOfferComponent },
  {path: 'single-offer', component: SingleOfferComponent, canActivate: [IsLoginGuard]},
  {path: 'add-product', component: AddProductComponent, canActivate: [IsLoginGuard]},
  {path: 'image-upload-test', component: ImageUploadComponent, canActivate: [IsLoginGuard]}
];
