import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';
import { CategoryModel } from './models/category.model';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from './services/category.service';
import { NgForm } from '@angular/forms';
import { SwalService } from '../../common/services/swal.service';
import { CategoryPipe } from './pipes/category.pipe';
import { HeaderModel } from '../../common/components/table/models/header.model';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [SharedModule, CategoryPipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  categories: CategoryModel[] = [];
  updateCategory: CategoryModel = new CategoryModel();
  search: string = '';
  headers: HeaderModel[] = [
    {
      title: '#',
      class: 'col-1 text-center',
    },
    {
      title: 'Kategori Adı',
      class: 'col-10',
    },
    {
      title: 'İşlemler',
      class: 'col-1 text-center',
    },
  ];
  constructor(
    private _toastr: ToastrService,
    private _category: CategoryService,
    private _swal: SwalService
  ) {}
  ngOnInit(): void {
    this.getAll();
  }
  getAll() {
    this._category.getAll((res) => (this.categories = res));
  }
  get(model: CategoryModel) {
    this.updateCategory = { ...model };
  }
  add(form: NgForm) {
    if (form.valid) {
      this._category.add(form.controls['name'].value, (res) => {
        this._toastr.success(res.message);
        let element = document.getElementById('addModalCloseBtn');
        element?.click();
        form.reset();
        this.getAll();
      });
    }
  }
  update(form: NgForm) {
    if (form.valid) {
      this._category.update(this.updateCategory, (res) => {
        this._toastr.warning(res.message);
        let element = document.getElementById('updateModalCloseBtn');
        element?.click();
        form.reset();
        this.getAll();
      });
    }
  }
  removeById(model: CategoryModel) {
    this._swal.callSwall(
      'Kategorisini silmek istiyor musunuz?',
      model.name,
      'Sil',
      () => {
        this._category.removeById(model._id, (res) => {
          this._toastr.info(`${model.name}, Kategorisi silinmiştir.`);
          this.getAll();
        });
      }
    );
  }
}
