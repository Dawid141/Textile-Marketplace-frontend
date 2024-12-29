import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {MasterComponent} from './components/master/master.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, MasterComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'textile-marketplace-frontend';
}
