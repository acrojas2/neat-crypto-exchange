import neatAxiosClient from '../../clients/neat-api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor() { }

  async createOrder({
    amount,
    type,
    currentMarketPrice,
    marketId
  }: {
      amount: number
      type: string
      currentMarketPrice: number
      marketId: string
  }): Promise<any> {
    try {
      const body = {
        amount,
        type,
        currentMarketPrice,
        marketId
      }
      const response = await neatAxiosClient.post('/orders', body);
      return response.data;
    } catch (error) {
      console.error('Error al obtener los market prices:', error);
      throw error;
    }
  }

}
