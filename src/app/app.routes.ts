import { Routes } from '@angular/router';
import {ProductsComponent} from './components/products-main-site/products.component';
import {MyAccountComponent} from './components/my-account/my-account.component';
import {ContactComponent} from './components/contact/contact.component';
import {MainPageComponent} from './components/main-page/main-page.component';
import {MyOrdersComponent} from './components/my-orders/my-orders.component';

export const routes: Routes = [{
  path: 'products',
  component: ProductsComponent
},
  {
    path: 'main-page', component: MainPageComponent
  },
  {
    path: 'my-account', component: MyAccountComponent
  },
  {
    path: 'contact', component: ContactComponent
  },
  {
    path: 'my-orders', component: MyOrdersComponent
  }
];


