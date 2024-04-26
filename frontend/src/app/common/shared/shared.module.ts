import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ValidDirective } from '../directives/valid.directive';
import { BlankComponent } from '../components/blank/blank.component';
import { TableComponent } from '../components/table/table.component';
import { TrCurrencyPipe } from 'tr-currency';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ValidDirective,
    BlankComponent,
    TableComponent,
    TrCurrencyPipe,
    InfiniteScrollModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ValidDirective,
    BlankComponent,
    TableComponent,
    TrCurrencyPipe,
    InfiniteScrollModule,
  ],
})
export class SharedModule {}
