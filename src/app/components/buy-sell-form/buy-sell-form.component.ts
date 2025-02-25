import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WalletService } from '../../services/wallet-service.service';
import { OrdersService } from '../../services/orders.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MarketsService } from '../../services/markets-service.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-buy-sell-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './buy-sell-form.component.html',
  styleUrl: './buy-sell-form.component.scss'
})
export class BuySellFormComponent implements OnInit {
  fromWalletCurrencyCode: string | null = null;
  toWalletCurrencyCode: string | null = null;
  type: string | null = null;
  wallet: {
    balance: number;
    frozenBalanceToRemove: number;
    frozenBalanceToAdd: number;
    currencyCode: string;
    [key: string]: number | string | any[];
  } | null = null;

  currentStepForm: number = 1;
  totalStepsForm: number = 3;
  form: FormGroup;

  currentMarketPrice: {
    currentPrice: number;
    marketId: string;
    [key: string]: number | string | any[];
  } = {
      currentPrice: 0,
      marketId: ''
    };

  confirmationOrderData = {
    amount: 0,
    fiatAmount: 0,
  }

  currentMarket: {
    market: {
      minOrderAmount: [number, string];
      id: string;
      [key: string]: number | string | any[];
    }

  } = { market: { minOrderAmount: [ 0, ''], id: '' } }


  constructor(
    private route: ActivatedRoute,
    private walletService: WalletService,
    private marketService: MarketsService,
    private ordersService: OrdersService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      amount: [''],
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(async (params: Params) => {
      this.fromWalletCurrencyCode = params['fromWalletCurrencyCode'] || null;
      this.toWalletCurrencyCode = params['toWalletCurrencyCode']
      this.type = params['type'] || null;

      if (this.fromWalletCurrencyCode) {
        this.loadWallet(this.fromWalletCurrencyCode);
      }
      const marketId = this.getMarketId();

      await this.loadMarketPrice(marketId);

      await this.loadMarket(marketId);

      const { minOrderAmount } = this.currentMarket.market;
      const maxAmountOrder = this.maxOrderAmount();
      if (maxAmountOrder) {
        this.updateAmountFormValidation(minOrderAmount, maxAmountOrder);
      }
    });
  }

  getMarketId() {
    if (this.type == 'buy') {
    return `${this.toWalletCurrencyCode}-${this.fromWalletCurrencyCode}`
    }
    return `${this.fromWalletCurrencyCode}-${this.toWalletCurrencyCode}`
  }

  async loadWallet(currencyCode: string): Promise<any> {
    this.wallet = await this.walletService.getWalletByCurrencyCode({ currencyCode });
    // To Do: Borrar logs
    console.log(this.wallet)
  }

  async loadMarketPrice(marketId: string): Promise<any> {
    this.currentMarketPrice = await this.marketService.getMarketPriceById({ marketId });
  }


  async loadMarket(marketId: string): Promise<any> {
    this.currentMarket = await this.marketService.getMarketById({ marketId });
  }

  maxOrderAmount(): [number, string] | undefined {
    if (this.wallet) {
      if (this.type == 'buy') {
        const currentMarketPrice = this.currentMarketPrice?.currentPrice;
        if (this.toWalletCurrencyCode) {
          return [(this.wallet.balance - this.wallet.frozenBalanceToRemove) / currentMarketPrice, this.toWalletCurrencyCode]
        }
      }
      if (this.fromWalletCurrencyCode) {
        const maxAmount = Math.max(this.wallet?.balance - this.wallet.frozenBalanceToRemove, 0);
        return [maxAmount, this.fromWalletCurrencyCode]
      }
    }
    return undefined;
  }

  updateAmountFormValidation(minOrderAmount: [number, string], maxAmountOrder: [number, string]) {
    this.form.get('amount')?.setValidators([Validators.required, Validators.min(minOrderAmount[0]), Validators.max(maxAmountOrder[0])]);
    this.form.get('amount')?.updateValueAndValidity();
  }


  nextStep() {
    this.currentStepForm++;

    if (this.currentStepForm === 2) {
      this.fillConfirmationOrderData();
    }
  }

  previousStep() {
    if (this.currentStepForm) {
      this.currentStepForm--;
    }
  }

  getFormValue(inputForm: string) {
    return this.form.get(inputForm)?.value
  }

  amountInFiatCurrency() {
    const amountInCrypto = this.getFormValue('amount');
    const currentMarketPrice = this.currentMarketPrice?.currentPrice;
    return amountInCrypto * currentMarketPrice;
  }


  orderType() {
    switch (this.currentStepForm) {
      case 1:
        return this.type === 'buy' ? 'comprar' : 'vender'
      case 2:
        return this.type === 'buy' ? 'compra' : 'venta'
      case 3:
        return this.type === 'buy' ? 'compra' : 'venta'
    }
    return;
  }

  setWalletsDestinationType() {
    const splitedMarketId = this.currentMarketPrice['marketId'].split('-');
    switch (this.type) {
      case 'sell':
        return { from: splitedMarketId[0], to: splitedMarketId[1] }
      case 'buy':
        return { from: splitedMarketId[1], to: splitedMarketId[0] }
    }
    return { from: '', to: '' }
  }

  fillConfirmationOrderData() {
    this.confirmationOrderData = {
      amount: this.getFormValue('amount'),
      fiatAmount: this.amountInFiatCurrency()
    }
  }

  isFormValidate(): Boolean | undefined {
    // To Do: borrar los logs
    console.log("[IS FORM VALIDATE]", this.form.get('amount')?.valid)
    return this.form.get('amount')?.valid
  }

  amountLabelCurrency() {
    return this.type == 'buy' ? this.toWalletCurrencyCode : this.fromWalletCurrencyCode;
  }

  amountFiatLabelCurrency() {
    return this.type == 'buy' ? this.fromWalletCurrencyCode : this.toWalletCurrencyCode;
  }


  async createOrder(): Promise<any> {
    if (this.type) {
      await this.ordersService.createOrder({
        amount: this.getFormValue('amount'),
        type: this.type,
        currentMarketPrice: this.currentMarketPrice.currentPrice,
        marketId: this.currentMarket.market.id
      });
      this.nextStep();
    }

    // To Do: Borrar logs
    console.log(this.wallet)
  }


}

