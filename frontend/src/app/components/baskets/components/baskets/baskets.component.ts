import { Component, OnInit } from '@angular/core';
import { BasketModel } from '../../models/basket.model';
import { SharedModule } from '../../../../common/shared/shared.module';
import { HeaderModel } from '../../../../common/components/table/models/header.model';
import { BasketService } from '../../services/basket.service';
import { ToastrService } from 'ngx-toastr';
import { SwalService } from '../../../../common/services/swal.service';
import { OrderService } from '../../../orders/services/order.service';

@Component({
  selector: 'app-baskets',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './baskets.component.html',
  styleUrl: './baskets.component.css',
})
export class BasketsComponent implements OnInit {
  constructor(
    private _basket: BasketService,
    private _swal: SwalService,
    private _toastr: ToastrService,
    private _order: OrderService
  ) {}
  ngOnInit(): void {
    this.getAll();
  }
  baskets: BasketModel[] = [];
  sum: number = 0;
  headers: HeaderModel[] = [
    {
      title: '#',
      class: 'col-1 text-center',
    },
    {
      title: 'Ürün Resmi',
      class: 'col-1 text-center',
    },
    {
      title: 'Ürün Adı',
      class: 'col-4',
    },
    {
      title: 'Adet',
      class: 'col-2 text-center',
    },
    {
      title: 'Birim Fiyatı',
      class: 'col-1 text-center',
    },
    {
      title: 'Toplam Tutar ',
      class: 'col-1 text-center',
    },
    {
      title: 'İşlemler',
      class: 'col-2 text-center',
    },
  ];
  getAll() {
    this._basket.getAll((res) => {
      this.baskets = res;
      this.calculate();
    });
  }
  calculate() {
    this.sum = 0;
    this.baskets.forEach((element) => {
      this.sum += element.price * element.quantity;
    });
  }
  removeById(id: string) {
    this._swal.callSwall(
      'Ürünü Sepetten Silmek İstiyor musunuz?',
      'Ürünü Sil',
      'Sil',
      () => {
        this._basket.removeById({ _id: id }, (res) => {
          this._toastr.info(res.message);
          this.getAll();
        });
      }
    );
  }
  increase(basket: BasketModel) {
    let model = new BasketModel();
    model.productId = basket.productId;
    model.price = basket.price;
    model.quantity = 1;
    this._basket.add(model, (res) => {
      this._toastr.info('Ürün Sayısı Artırılmıştır.');
      this.getAll();
    });
  }

  reduce(basket: BasketModel) {
    if (basket.quantity == 1) {
      this._swal.callSwall(
        'Ürünü Sepetten Silmek İstiyor musunuz?',
        'Ürünü Sil',
        'Sil',
        () => {
          this._basket.removeById({ _id: basket._id }, (res) => {
            this._toastr.info(res.message);
            this.getAll();
          });
        }
      );
    } else {
      let model = new BasketModel();
      model.productId = basket.productId;
      model.price = basket.price;
      model.quantity = -1;
      this._basket.add(model, (res) => {
        this._toastr.info('Ürün Sayısı Azaltılmıştır.');
        this.getAll();
      });
    }
  }
  createOrder() {
    this._swal.callSwall(
      'Ürünleri almak istiyor musunuz?',
      'Ürünleri Al',
      'Ödeme Yap',
      () => {
        this._order.create((res) => {
          this._toastr.success(res.message);
          this.getAll();
        });
      }
    );
  }
}
