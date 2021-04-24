import { ProductsService } from 'src/app/products/services/products.service';
import { TransactionFormComponent } from './../transaction-form/transaction-form.component';
import { TransactionsService } from './../../services/transactions.service';
import { TransactionModel } from './../../models/transaction-model';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/components/base/base.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-transaction-index',
  templateUrl: './transaction-index.component.html',
  styleUrls: ['./transaction-index.component.css']
})
export class TransactionIndexComponent extends BaseComponent<TransactionModel>
  implements OnInit, AfterViewInit {
  constructor(
    private TrxSvc: TransactionsService,
    private toastr: ToastrService,
    http: HttpClient,
    dialog: MatDialog,
    public prodSvc: ProductsService,
    private snackBar: MatSnackBar
  ) {
    super(http, dialog);

  }


  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!',
      { timeOut: 2000 });;
  }
  showError() {
    this.toastr.error('everything is broken', 'Major Error', {
      timeOut: 3000
    });

  }

  ngOnInit(): void {

    let columns = [
      { data: 'id' },
      { data: 'partnerId' },
      { data: 'transactionType' },
      { data: 'createdAt' },
      { data: 'createdBy' },
      { data: '' },
    ];
    this.InitDt('Transaction/GetDataTablePaggedList', columns);
  }

  ngAfterViewInit(): void {
    this.CallngAfterViewInit();
  }

  AddNewSale(): void {
    this.OpenDilog(TransactionFormComponent, { Type: 'Sale' }).subscribe(
      (data) => {
        console.log('After Closed Data' + data);
        console.log(data);
        this.rerender();
      }
    );
  }

  AddNewProcurement(): void {
    this.OpenDilog(TransactionFormComponent, { Type: 'Procurement' }, '800px').subscribe(
      (data) => {
        console.log('After Closed Data' + data);
        console.log(data);
        this.rerender();
      }
    );
  }



  Edit(Id: number): void {
    debugger;

    this.TrxSvc.getTransaction(Id).subscribe(data => {

      if (data != null) {
        this.OpenDilog(TransactionFormComponent, data).subscribe(
          (data) => {
            console.log('After Closed Data' + data);
            console.log(data);


            if (data === true) {
              this.rerender();
            }

          }
        );

      }

    });


  }


  Delete(Id: number) {
    this.ConfirmDialog('Are you sure you want to delete?').subscribe(
      (result) => {
        console.log(result);
        if (result) {
          this.TrxSvc.DeleteTransaction(Id).subscribe(res => {
            if (res) {
              this.snackBar.open('Successfully Deleted ...', ' ', {
                duration: 3000,
              });
              this.rerender();
            }
          })
        }

        this.snackBar.open('Cancelled ...', ' ', {
          duration: 3000,
        });

      }
    );
  }

}
