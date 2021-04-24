import { AppSelectComponent } from './core/components/app-select/app-select.component';
import { TransactionModule } from './Transactions/transaction.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./core/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./products/product.module').then((m) => m.ProductModule),
  },

  {
    path: 'partner', loadChildren: () => import('./Partners/partner.module').then((m) => m.PartnerModule),
  },

  {
    path: 'transaction', loadChildren: () => import('./Transactions/transaction.module').then((m) => m.TransactionModule),
  },

  { path: 'select', component: AppSelectComponent },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
