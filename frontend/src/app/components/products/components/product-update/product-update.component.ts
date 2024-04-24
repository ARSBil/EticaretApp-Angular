import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../common/shared/shared.module';
import { CategoryModel } from '../../../categories/models/category.model';
import { NgForm } from '@angular/forms';
import { CategoryService } from '../../../categories/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-product-update',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.css',
})
export class ProductUpdateComponentimplements implements OnInit {
  categories: CategoryModel[] = [];
  images: File[] = [];
  imageUrls: any[] = [];
  protuctId: string = '';
  product: ProductModel = new ProductModel();
  constructor(
    private _category: CategoryService,
    private _product: ProductService,
    private _router: Router,
    private _toastr: ToastrService,
    private _activated: ActivatedRoute
  ) {
    this._activated.params.subscribe((res) => {
      this.protuctId = res['value'];
      this.getById();
    });
  }
  ngOnInit(): void {
    this.images = [];
    this.getCategories();
  }
  getById() {
    let model = { _id: this.protuctId };
    this._product.getById(model, (res) => (this.product = res));
  }
  getCategories() {
    this._category.getAll((res) => (this.categories = res));
  }
  getImages(event: any) {
    const file: File[] = Array.from(event.target.files);
    this.images.push(...file);

    for (let i = 0; i < event.target.files.length; i++) {
      const element = event.target.files[i];
      const reader = new FileReader();
      reader.readAsDataURL(element);
      reader.onload = () => {
        const imageUrl = reader.result as string;
        this.addImage(imageUrl, element);
      };
    }
  }
  addImage(imageUrl: string, file: File) {
    this.imageUrls.push({
      imageUrl: imageUrl,
      name: file.name,
      size: file.size,
    });
  }
  removeImage(name: string, size: number, index: number) {
    this.imageUrls.splice(index, 1);
    let i = this.images.findIndex((p) => p.name == name && p.size == size);
    this.images.splice(i, 1);
  }
  deleteImage(id: string, index: number) {
    let model = { _id: id, index: index };
    this._product.removeImageByProductIdAndIndex(model, (res) => {
      this._toastr.warning(res.message);
      this.getById();
    });
  }
  update(form: NgForm) {
    if (form.value['categoriesSelect'].length == 0) {
      this._toastr.error('Kategori seçimi yapmadınız!');
      return;
    }
    if (form.valid) {
      let product = form.value;
      let categories: string[] = product['categoriesSelect'];
      let name = product['name'];
      let price = product['price'];
      let stock = product['stock'];
      price = price.toString().replace(',', '.');
      let formData = new FormData();
      formData.append('_id', this.product._id);
      formData.append('name', this.product.name);
      formData.append('price', price);
      formData.append('stock', stock);

      categories.forEach((categories) => {
        formData.append('categories', categories);
      });
      if (this.images != undefined) {
        this.images.forEach((image) => {
          formData.append('images', image, image.name);
        });
      }

      this._product.update(formData, (res) => {
        this._toastr.info(res.message);
        this._router.navigateByUrl('/products');
      });
    }
  }
}
