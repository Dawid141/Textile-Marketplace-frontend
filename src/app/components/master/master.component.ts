import {Component, ViewEncapsulation} from '@angular/core';
import {ProductsComponent} from '../products-main-site/products.component';
import {ContactComponent} from '../contact/contact.component';
import {MyAccountComponent} from '../my-account/my-account.component';
import {SingleOfferComponent} from '../single-offer/single-offer.component';
import {CommonModule} from '@angular/common';
import {MatTab, MatTabGroup, MatTabLink, MatTabNav, MatTabNavPanel} from '@angular/material/tabs';
import {MatIcon} from '@angular/material/icon';
import {MatButtonModule, MatFabButton, MatIconButton} from '@angular/material/button';
import {MatToolbar} from '@angular/material/toolbar';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {PermissionService} from '../../services/permission.service';
import {JwtService} from '../../services/jwt-service.service';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
    selector: 'app-master',
  imports: [
    MatTabNavPanel, CommonModule, MatIcon, MatTabNav, MatTabLink, MatTabNavPanel, MatButtonModule, MatToolbar, RouterLink, MatIconButton, RouterLinkActive, MatTooltip
  ],
    templateUrl: './master.component.html',
    standalone: true,
    styleUrl: './master.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class MasterComponent {

  constructor(public permissionService: PermissionService, protected jwtService: JwtService) {
  }

  navLinks = [
    { path: '/products', label: 'Main Page' },
    { path: '/my-offers', label: 'My Offers' },
    { path: '/my-orders', label: 'My Orders' },
  ];

  isLinkDisabled(path: string): boolean {
    return (path === '/my-orders' || path === '/my-offers') && this.permissionService.isExpired();
  }

}
