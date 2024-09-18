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

      const response = await neatAxiosClient.get(`/users/${userId}/wallets`); // Ajusta el endpoint según corresponda
      return response.data.wallets;
    } catch (error) {
      console.error('Error al obtener las wallets:', error);
      throw error;
    }
  }
}
