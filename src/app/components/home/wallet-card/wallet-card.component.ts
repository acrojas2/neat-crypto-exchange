import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'wallet-card',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './wallet-card.component.html',
  styleUrl: './wallet-card.component.scss'
})
export class WalletCardComponent {
  @Input() balance: number | undefined;
  @Input() frozenBalanceToRemove: number | undefined;
  @Input() frozenBalanceToAdd: number | undefined;
  @Input() name: string | undefined;
  @Input() code: string | undefined;

  allowedToSell(code: string): Boolean {
    return code !== undefined && code !== 'USD';
  }
}





