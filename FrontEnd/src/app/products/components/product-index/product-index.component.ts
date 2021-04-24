import { ProductFormComponent } from './../product-form/product-form.component';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from './../../models/product-model';
import { BaseComponent } from './../../../core/components/base/base.component';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from 'src/app/core/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-product-index',
  templateUrl: './product-index.component.html',
  styleUrls: ['./product-index.component.css'],
})
export class ProductIndexComponent
  extends BaseComponent<ProductModel>
  implements OnInit, AfterViewInit {
  dtOptions: DataTables.Settings = {};
  products: ProductModel[] | undefined;
  constructor(
    private productsSvc: ProductsService,
    http: HttpClient,
    dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    super(http, dialog);
  }

  ngOnInit(): void {
    //debugger;
    let columns = [
      { data: 'id' },
      { data: 'name' },
      { data: 'price' },
      { data: 'numberInStock' },
      { data: '' },
    ];
    this.InitDt('product/GetDataTablePaggedList', columns);
  }

  ngAfterViewInit(): void {
    this.CallngAfterViewInit();
  }

  Add(): void {

    let data = {
      description: "Description",
      id: 10,
      massUnitSymbol: "",
      massValue: 80,
      name: "test00",
      numberInStock: 20,
      price: 10
    }

    this.OpenDilog(ProductFormComponent).subscribe(
      (data) => {
        console.log('After Closed Data' + data);
        console.log(data);
        if (data === true) {
          this.rerender();
        }

      }
    );
  }

  Edit(Id: number): void {
    debugger;

    this.productsSvc.getProduct(Id).subscribe(data => {

      if (data != null) {
        this.OpenDilog(ProductFormComponent, data).subscribe(
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
          this.productsSvc.DeleteProduct(Id).subscribe(res => {
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
