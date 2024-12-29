import { Component } from '@angular/core';
import {ProductsComponent} from '../products-main-site/products.component';
import {ContactComponent} from '../contact/contact.component';
import {MyAccountComponent} from '../my-account/my-account.component';
import {MainPageComponent} from '../main-page/main-page.component';
import {CommonModule} from '@angular/common';
import {MatTab, MatTabGroup, MatTabLink, MatTabNav, MatTabNavPanel} from '@angular/material/tabs';
import {MatIcon} from '@angular/material/icon';
import {MatButtonModule, MatFabButton, MatIconButton} from '@angular/material/button';
import {MatToolbar} from '@angular/material/toolbar';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
    selector: 'app-master',
  imports: [
    MatTabNavPanel,ProductsComponent, ContactComponent, MyAccountComponent, MainPageComponent, CommonModule, MatTabGroup, MatTab, MatIcon, MatFabButton, MatTabNav, MatTabLink, MatTabNavPanel, MatButtonModule, MatToolbar, RouterLink, MatIconButton, RouterLinkActive
  ],
    templateUrl: './master.component.html',
    standalone: true,
    styleUrl: './master.component.css'
})

export class MasterComponent {
  navLinks = [
    { path: '/main-page', label: 'Main Page' },
    { path: '/products', label: 'Produkty' },
    // { path: '/my-account', label: 'My Account' },
    { path: '/my-orders', label: 'My Orders' },
    { path: '/contact', label: 'Contact' },
  ];

}
