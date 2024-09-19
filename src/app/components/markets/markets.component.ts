import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketsService } from '../../services/markets-service.service';


@Component({
  selector: 'app-markets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './markets.component.html',
  styleUrl: './markets.component.scss',
  providers: [MarketsService]
})
export class MarketsComponent implements OnInit{
  marketPrices: any[] = [];

  constructor(private marketsService: MarketsService) { }

  async ngOnInit(): Promise<void> {
    try {
      this.marketPrices = await this.marketsService.getMarketPrices();
      console.log("[marketPrices]",this.marketPrices)
    } catch (error) {
      console.error('Error al cargar los markets prices:', error);
    }
  }

  isVariationRising(variation: number): boolean {
    return variation > 0;
  }

  formatVariationPrice(variation: number): string {
    const absVariation = Math.abs(variation)
    const variationInPercent = `${absVariation * 100}%`;

    return variation > 0 ? `+ ${variationInPercent}` : `- ${variationInPercent} `
  }
}
