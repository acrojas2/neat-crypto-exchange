import neatAxiosClient from '../../clients/neat-api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MarketsService {

  constructor() { }

  async getMarketPrices(): Promise<any> {
    try {
      const response = await neatAxiosClient.get('/market-prices');
      return response.data.marketPrices;
    } catch (error) {
      console.error('Error al obtener los market prices:', error);
      throw error;
    }
  }
}
