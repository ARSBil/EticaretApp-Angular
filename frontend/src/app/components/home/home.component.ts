import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';
import { CategoryModel } from '../categories/models/category.model';
import { CategoryService } from '../categories/services/category.service';
import { RequestModel } from '../../common/models/request.model';
import { ProductService } from '../products/services/product.service';
import { ProductModel } from '../products/models/product.model';
import { PaginationResultModel } from '../../common/models/pagination-result.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  categories: CategoryModel[] = [];
  request: RequestModel = new RequestModel();
  result: PaginationResultModel<ProductModel[]> = new PaginationResultModel<
    ProductModel[]
  >();
  pageNumbers: number[] = [];
  product: ProductModel = new ProductModel();
  constructor(
    private _category: CategoryService,
    private _product: ProductService
  ) {}
  ngOnInit(): void {
    this.getCategories();
    this.getAll(1);
  }

  getAll(pageNumber = 1) {
    this.request.pageNumber = pageNumber;
    this._product.getAllForHomePage(this.request, (res) => {
      this.result.datas = [...this.result.datas, ...res.datas];
      this.result.isFirstPage = res.isFirstPage;
      this.result.isLastPage = res.isLastPage;
      this.result.pageNumber = res.pageNumber;
      this.result.pageSize = res.pageSize;
      this.result.totalPageCount = res.totalPageCount;
      this.setPageNumbers();
    });
  }

  setPageNumbers() {
    const startPage = Math.max(1, this.result.pageNumber - 2);
    const endPage = Math.min(
      this.result.totalPageCount,
      this.result.pageNumber + 2
    );
    this.pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      this.pageNumbers.push(i);
    }
  }
  
  search() {
    if (this.request.search.length > 3) {
      this.getAll(1);
    }
  }
  getCategories() {
    this._category.getAll((res) => {
      this.categories = res;
      let tumu: CategoryModel = new CategoryModel();
      tumu.name = 'Tümü';
      this.categories.unshift(tumu);
    });
  }
  changeCategory(categoryId: string, categoryName: string) {
    this.request.categoryName = categoryName;
    this.request.categoryId = categoryId;
  }
}
