import { Component } from '@angular/core';
import {ProductsComponent} from '../products/products.component';
import {ContactComponent} from '../contact/contact.component';
import {MyAccountComponent} from '../my-account/my-account.component';
import {MainPageComponent} from '../main-page/main-page.component';
import {CommonModule} from '@angular/common';
import {MatTab, MatTabGroup, MatTabLink, MatTabNav, MatTabNavPanel} from '@angular/material/tabs';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatFabButton} from '@angular/material/button';

@Component({
    selector: 'app-master',
  imports: [
    ProductsComponent, ContactComponent, MyAccountComponent, MainPageComponent, CommonModule, MatTabGroup, MatTab, MatIcon, MatFabButton, MatTabNav, MatTabLink, MatTabNavPanel, MatButton
  ],
    templateUrl: './master.component.html',
    standalone: true,
    styleUrl: './master.component.css'
})

export class MasterComponent {

}
