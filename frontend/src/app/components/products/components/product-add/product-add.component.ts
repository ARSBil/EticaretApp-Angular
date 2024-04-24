import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../common/shared/shared.module';
import { CategoryModel } from '../../../categories/models/category.model';
import { NgForm } from '@angular/forms';
import { CategoryService } from '../../../categories/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent implements OnInit {
  categories: CategoryModel[] = [];
  images: File[] = [];
  imageUrls: any[] = [];
  constructor(
    private _category: CategoryService,
    private _prodoct: ProductService,
    private _router:Router,
    private _toastr: ToastrService
  ) {

  }
  ngOnInit(): void {
    this.images = [];
    this.getCategories();
  }
  getCategories() {
    this._category.getAll(res => this.categories = res);
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
      }
    }
  }
  addImage(imageUrl: string, file: File) {
    this.imageUrls.push({
      imageUrl: imageUrl,
      name: file.name,
      size: file.size

    })
  }
  removeImage(name: string, size: number, index: number) {
    this.imageUrls.splice(index, 1);
    let i = this.images.findIndex(p => p.name == name && p.size == size);
    this.images.splice(i, 1);
  }
  add(form: NgForm) {
    if (form.value["categoriesSelect"].length == 0) {
      this._toastr.error("Kategori seçimi yapmadınız!");
      return;
    }
    if (form.valid) {
      let product = form.value;
      let categories: string[] = product["categoriesSelect"];
      let name = product["name"];
      let price = product["price"];
      let stock = product["stock"];
      price = price.toString().replace(",", ".");
      let formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("stock", stock);
      categories.forEach(categories => {
        formData.append("categories", categories);
      });
      this.images.forEach(image => {
        formData.append("images", image, image.name);
      });
      this._prodoct.add(formData, res=>{
        this._toastr.success(res.message);
        form.reset();
        this.imageUrls = [];
        this.images = [];
      });
    }
  }
}
