import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyButton } from './components/button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MyButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'neat-crypto-exchange';
}
