import { Component } from '@angular/core';
import {ProductsComponent} from '../products-main-site/products.component';
import {ContactComponent} from '../contact/contact.component';
import {MyAccountComponent} from '../my-account/my-account.component';
import {SingleOfferComponent} from '../single-offer/single-offer/single-offer.component';
import {CommonModule} from '@angular/common';
import {MatTab, MatTabGroup, MatTabLink, MatTabNav, MatTabNavPanel} from '@angular/material/tabs';
import {MatIcon} from '@angular/material/icon';
import {MatButtonModule, MatFabButton, MatIconButton} from '@angular/material/button';
import {MatToolbar} from '@angular/material/toolbar';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
    selector: 'app-master',
  imports: [
    MatTabNavPanel,ProductsComponent, ContactComponent, MyAccountComponent, SingleOfferComponent, CommonModule, MatTabGroup, MatTab, MatIcon, MatFabButton, MatTabNav, MatTabLink, MatTabNavPanel, MatButtonModule, MatToolbar, RouterLink, MatIconButton, RouterLinkActive
  ],
    templateUrl: './master.component.html',
    standalone: true,
    styleUrl: './master.component.css'
})

export class MasterComponent {
  navLinks = [
    { path: '/products', label: 'Main Page' },
    { path: '/my-offers', label: 'My Offers' },
    { path: '/my-orders', label: 'My Orders' },
    { path: '/contact', label: 'Contact' },
  ];

}
