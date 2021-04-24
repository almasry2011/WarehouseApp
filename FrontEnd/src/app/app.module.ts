import { HttpInterceptorService } from './core/Interceptor/http-interceptor.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { SidebarComponent } from './core/components/sidebar/sidebar.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './core/AngularMaterials/angular-material.module.ts/angular-material.module.ts.module';
import { ProductFormComponent } from './products/components/product-form/product-form.component';
import { ProductCreateComponent } from './products/components/product-create/product-create.component';
import { ProductEditComponent } from './products/components/product-edit/product-edit.component';
import { ProductIndexComponent } from './products/components/product-index/product-index.component';
import { DataTablesModule } from 'angular-datatables';
import { BaseComponent } from './core/components/base/base.component';
import { ConfirmDialogComponent } from './core/components/confirm-dialog/confirm-dialog.component';
import { PartnerFormComponent } from './Partners/components/partner-form/partner-form.component';
import { PartnerIndexComponent } from './Partners/components/partner-index/partner-index.component';
import { ToastrModule } from 'ngx-toastr';

import { NgSelectModule } from '@ng-select/ng-select';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    PageNotFoundComponent,

    BaseComponent,
    ConfirmDialogComponent,
    PartnerFormComponent,
    PartnerIndexComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added
    NgSelectModule,

    AngularMaterialModule,
    DataTablesModule,

    AutoCompleteModule,
    MultiSelectModule,
    DropdownModule,
    NgxSpinnerModule


  ],
  // providers: [],//[{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
