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

  async getMarketPriceById({ marketId } : { marketId: string }): Promise<any> {
    try {
      const response = await neatAxiosClient.get(`/market-prices/${marketId}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener los market prices:', error);
      throw error;
    }
  }

  async getMarketById({ marketId } : { marketId: string }): Promise<any> {
    try {
      const response = await neatAxiosClient.get(`/markets/${marketId}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener el market:', error);
      throw error;
    }
  }
}
