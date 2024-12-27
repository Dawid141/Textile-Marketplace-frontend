import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ProductsComponent} from './components/products-main-site/products.component';
import {MasterComponent} from './components/master/master.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MasterComponent,ProductsComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'textile-marketplace-frontend';
}
