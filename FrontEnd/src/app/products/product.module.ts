import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductIndexComponent } from './components/product-index/product-index.component';
import { AngularMaterialModule } from '../core/AngularMaterials/angular-material.module.ts/angular-material.module.ts.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductFormComponent,
    ProductCreateComponent,
    ProductEditComponent,
    ProductIndexComponent,],
  imports: [CommonModule, ProductRoutingModule,
    DataTablesModule, AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class ProductModule { }
