import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { TransactionIndexComponent } from './components/transaction-index/transaction-index.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { AngularMaterialModule } from '../core/AngularMaterials/angular-material.module.ts/angular-material.module.ts.module';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AppSelectComponent } from '../core/components/app-select/app-select.component';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [
    TransactionIndexComponent,
    TransactionFormComponent,
    AppSelectComponent,
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,


    AngularMaterialModule,
    AutoCompleteModule,

    MultiSelectModule,
    DropdownModule,
    MatSelectInfiniteScrollModule,
    MatFormFieldModule,
    MatSelectModule,
    ScrollingModule
    ,
    NgxSpinnerModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class TransactionModule { }
