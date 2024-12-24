import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatDrawer, MatDrawerContainer, MatSidenavModule} from '@angular/material/sidenav';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-products',
  imports: [FormsModule, MatDrawer, MatDrawerContainer,MatSidenavModule, MatGridListModule, MatMenuModule, MatButtonModule,MatCardModule,MatIconModule,MatExpansionModule,MatListModule,MatToolbarModule,MatTableModule],
  templateUrl: './products.component.html',
  standalone: true
})
export class ProductsComponent {

}
