import neatAxiosClient from '../../clients/neat-api';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private authService: AuthService) { }

  async getWallets(): Promise<any> {
    try {
      const currentUser = this.authService.user;
      const userId = currentUser?.uid;

      const response = await neatAxiosClient.get(`/users/${userId}/wallets`);
      return response.data.wallets
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getWalletByCurrencyCode({ currencyCode } : { currencyCode : string }): Promise<any> {
    try {
      const currentUser = this.authService.user;
      const userId = currentUser?.uid;

      const response = await neatAxiosClient.get(`/users/${userId}/wallets/${currencyCode}`);
      return response.data.wallet;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
