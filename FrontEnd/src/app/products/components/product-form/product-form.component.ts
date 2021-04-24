import { AlertifyService } from 'src/app/core/services/alertify.service';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductCreateModel } from '../../models/product-create-model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  title: string = "Edit Product"
  IsCreateForm: boolean = false;
  MainForm!: FormGroup;

  id!: FormControl;
  name!: FormControl;
  description!: FormControl;
  price!: FormControl;
  numberInStock!: FormControl;
  massValue!: FormControl;
  massUnitSymbol!: FormControl;

  constructor(
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductCreateModel,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private prodSvc: ProductsService,
    private alertifySvc: AlertifyService
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    if (this.data == null) {
      this.data = {};
      this.IsCreateForm = true;
      this.title = "Create Product";
    }
    this.initForm();
  }

  CloseModal(Rerender: boolean): void {
    this.dialogRef.close(Rerender);
  }

  initForm() {
    this.id = new FormControl(this.IsCreateForm ? 0 : this.data.id);
    this.name = new FormControl(
      this.data.name,
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ])
    );
    this.description = new FormControl(
      this.data.description,
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(200),
      ])
    );
    this.price = new FormControl(
      this.data.price,
      Validators.compose([Validators.required, Validators.min(1)])
    );
    this.massValue = new FormControl(
      this.data.massValue,
      Validators.compose([Validators.required, Validators.min(1)])
    );
    this.massUnitSymbol = new FormControl('kg');
    this.numberInStock = new FormControl(
      this.data.numberInStock,
      Validators.compose([Validators.required, Validators.min(1)])
    );

    this.MainForm = this.fb.group({
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      massValue: this.massValue,
      massUnitSymbol: this.massUnitSymbol,
      numberInStock: this.numberInStock,
    });
  }

  OnFormSubmit() {
    if (this.MainForm.valid) {
      console.log(this.MainForm.value);

      if (this.IsCreateForm) {
        this.prodSvc.CreateProduct(this.MainForm.value).subscribe(res => {
          console.log(res)
          if (res) {
            this.CloseModal(true);
            this.alertifySvc.success('Successfully Created');
          }
        })
      } else {
        this.prodSvc.UpdateProduct(this.MainForm.value).subscribe(res => {
          console.log(res)
          if (res) {
            this.CloseModal(true);
            this.alertifySvc.success('Successfully Updated');
          }
        })

      }







    }
  }
}
