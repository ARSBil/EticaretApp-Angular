import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../common/services/generic-http.service';
import { BasketService } from '../../baskets/services/basket.service';
import { MessageResponseModel } from '../../../common/models/message.response.model';
import { OrderModel } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private _http : GenericHttpService,
    private _basket: BasketService
  ) { }
  
  create(callBack: (res: MessageResponseModel) => void) {
    let model: any = { userId: '' };
    let userString = localStorage.getItem('user');
    if (userString != null) {
      let user = JSON.parse(userString);
      model.userId = user._id;
    } else {
      model.userId = 'demo';
    }
    this._http.post<MessageResponseModel>('orders/create', model, (res) => {
      this._basket.getCount();
      callBack(res);
    });
  }
  
  getAll(callBack: (res: OrderModel[]) => void) {
    let model: any = { userId: '' };
    let userString = localStorage.getItem('user');
    if (userString != null) {
      let user = JSON.parse(userString);
      model.userId = user._id;
    } else {
      model.userId = 'demo';
    }
    this._http.post<OrderModel[]>('orders', model, (res) => {
      callBack(res);
    });
  }
}
