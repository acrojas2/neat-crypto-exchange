import { Component, Input } from '@angular/core';

@Component({
  selector: 'wallet-card',
  standalone: true,
  imports: [],
  templateUrl: './wallet-card.component.html',
  styleUrl: './wallet-card.component.scss'
})
export class WalletCardComponent {
  @Input() balance: number | undefined;
  @Input() frozenBalance: number | undefined;
  @Input() name: string | undefined;
  @Input() code: string | undefined;
}





