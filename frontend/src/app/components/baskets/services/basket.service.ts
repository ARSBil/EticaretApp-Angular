import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../common/services/generic-http.service';
import { BasketModel } from '../models/basket.model';
import { MessageResponseModel } from '../../../common/models/message.response.model';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  count: Number = 0;
  constructor(private _http: GenericHttpService) {}

  getAll(callBack: (res: BasketModel[]) => void) {
    let model: any = { userId: '' };
    let userString = localStorage.getItem('user');
    if (userString != null) {
      let user = JSON.parse(userString);
      model.userId = user._id;
    } else {
      model.userId = 'demo';
    }
    this._http.post<BasketModel[]>('baskets', model, (res) => callBack(res));
  }
  getCount() {
    let model: any = { userId: '' };
    let userString = localStorage.getItem('user');
    if (userString != null) {
      let user = JSON.parse(userString);
      model.userId = user._id;
    } else {
      model.userId = 'demo';
    }

    this._http.post<any>(
      'baskets/getCount',
      model,
      (res) => (this.count = res.count)
    );
  }
  add(model: BasketModel, callBack: (res: MessageResponseModel) => void) {
    let userString = localStorage.getItem('user');
    if (userString != null) {
      let user = JSON.parse(userString);
      model.userId = user._id;
    } else {
      model.userId = 'demo';
    }
    this._http.post<MessageResponseModel>('baskets/add', model, (res) => {
      this.getCount();
      callBack(res);
    });
  }
  removeById(model: any, callBack: (res: MessageResponseModel) => void) {
    let userString = localStorage.getItem('user');
    if (userString != null) {
      let user = JSON.parse(userString);
      model.userId = user._id;
    } else {
      model.userId = 'demo';
    }
    this._http.post<MessageResponseModel>(
      'baskets/removeById',
      model,
      (res) => {
        this.getCount();
        callBack(res);
      }
    );
  }
}
