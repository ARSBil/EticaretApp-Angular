import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../common/shared/shared.module';
import { OrderModel } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { HeaderModel } from '../../../../common/components/table/models/header.model';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  orders: OrderModel[] = [];
  sum: number = 0;
  headers: HeaderModel[] = [
    {
      title: '#',
      class: 'col-1 text-center',
    },
    {
      title: 'Sipariş Tarihi',
      class: 'col-2 text-center',
    },
    {
      title: 'Ürün Resmi',
      class: 'col-1 text-center',
    },
    {
      title: 'Ürün Adı',
      class: 'col-6',
    },
    {
      title: 'Adet',
      class: 'col-1 text-center',
    },
    {
      title: 'Birim Fiyatı',
      class: 'col-1 text-center',
    },
    {
      title: 'Toplam Tutar ',
      class: 'col-1 text-center',
    }
  ];
  constructor(private _order: OrderService) {}
  ngOnInit(): void {
    this._order.getAll((res) => (this.orders = res));
  }
}
