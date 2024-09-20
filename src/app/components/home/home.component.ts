import { Component, OnInit } from '@angular/core';
import { WalletCardComponent } from './wallet-card/wallet-card.component';
import { MarketsComponent } from './markets/markets.component';
import { CommonModule } from '@angular/common';
import { WalletService } from '../../services/wallet-service.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, WalletCardComponent, MarketsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [WalletService]
})
export class HomeComponent implements OnInit {
  wallets: any[] = [];

  constructor(private walletService: WalletService) { }

  async ngOnInit(): Promise<void> {
    try {
      this.wallets = await this.walletService.getWallets();
    } catch (error) {
      console.error('Error al cargar las wallets:', error);
    }
  }

}
