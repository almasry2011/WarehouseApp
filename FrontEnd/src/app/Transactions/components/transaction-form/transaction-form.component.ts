import { PartnerModel } from './../../../Partners/models/partner-model';
import { ProductModel } from './../../../products/models/product-model';
import { TransactionsService } from './../../services/transactions.service';
import { PartnersService } from './../../../Partners/services/partners.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from 'src/app/products/services/products.service';
import { AlertifyService } from 'src/app/core/services/alertify.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent implements OnInit {
  title: string = "New Transaction";
  PartnerSelectedValue: PartnerModel;

  IsCreateForm: boolean = false;
  PartnerReadOnly: boolean = false;

  MainForm!: FormGroup;

  FA_items: FormArray;

  transactionType: FormControl;
  total: FormControl;
  partnerId: FormControl;
  id: FormControl;
  _transactionLines!: FormArray;





  SelectedPartener: PartnerModel;
  SelectedProduct: ProductModel;

  constructor(
    public dialogRef: MatDialogRef<TransactionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public prodSvc: ProductsService,
    public PartnerSvc: PartnersService,
    private TrxSvc: TransactionsService,
    private alertifySvc: AlertifyService,

  ) { }



  ProductBindedName: string = "name";
  ProductBindedValue = "id";
  ProductPlaceholder = "Select Product";
  onProductChangedEvent(event) {
    //  alert(JSON.stringify(event))
    this.SelectedProduct = event;
    debugger;
    this.FA_items = this.MainForm.get('_transactionLines') as FormArray;
    let row = this.createItem(this.SelectedProduct.id, this.SelectedProduct.price, this.SelectedProduct.name);
    let IsExsist = this.FA_items.value.find(s => s.productId == this.SelectedProduct.id);
    if (!IsExsist) {
      this.FA_items.push(row);
    }


  }

  PartnerBindedName: string = "name";
  PartnerBindedValue = "id";
  PartnerPlaceholder = "Select Partner";
  onPartnerChangedEvent(event) {
    this.PartnerReadOnly = true;
    this.SelectedPartener = event;

    this.MainForm.controls['partnerId'].setValue(this.SelectedPartener.id);
    // alert(JSON.stringify(event))
  }


  ngOnInit(): void {

    console.log(this.data);
    if (this.data == null) {
      this.data = {};
      this.IsCreateForm = true;

    }
    this.initForm();
  }

  trackByFn(item: ProductModel) {
    return item.id;
  }



  CalculateTotal(index) {

    let qty = this.FA_items.controls[index].get('quantity').value;
    if (this.SelectedProduct.numberInStock > qty) {
      var lineTotal = this.FA_items.controls[index].get('unitPrice').value
        * qty + " $";
      this.FA_items.controls[index].get('total').setValue(lineTotal);

      debugger;


      let sum: number = 0;
      this.FA_items.getRawValue().forEach(a => sum += a.unitPrice * a.quantity);
      this.MainForm.controls['total'].setValue(sum);

    }

    this.FA_items.controls[index].get('quantity').setValidators([Validators.min(1), Validators.max(this.SelectedProduct.numberInStock)]);



  }


  CloseModal(Rerender: boolean): void {
    this.dialogRef.close(Rerender);
  }

  initForm() {
    this.id = new FormControl(0);
    this.partnerId = new FormControl(this.data.partnerId, Validators.compose([Validators.required, Validators.min(1)]));
    this.transactionType = new FormControl(this.data.Type == "Procurement" ? 1 : 0,
      Validators.compose([
        Validators.required,
        Validators.min(0)
      ])
    );
    this.total = new FormControl({ value: this.data.total, disabled: true });


    this.MainForm = this.fb.group({
      id: this.id,
      partnerId: this.partnerId,
      transactionType: this.transactionType,
      total: this.total,
      _transactionLines: this.fb.array([]),

    });
  }


  createItem(prodId: any = 0, unitPrice: any = 0, productName: any = ''): FormGroup {
    return this.fb.group({
      id: new FormControl(0),
      productId: new FormControl({ value: prodId, disabled: true }, Validators.compose([Validators.required, Validators.min(1)])),
      quantity: new FormControl(0, Validators.compose([Validators.required, Validators.min(1)])),
      unitPrice: new FormControl({ value: unitPrice, disabled: true }, Validators.compose([Validators.required, Validators.min(1)])),
      productName: new FormControl({ value: productName, disabled: true }, Validators.compose([Validators.required])),
      total: new FormControl({ value: 0, disabled: true }),
    });
  }

  addItem(): void {
    this.FA_items = this.MainForm.get('_transactionLines') as FormArray;
    this.FA_items.push(this.createItem());
  }

  removeItem(i: number) {
    this.FA_items.removeAt(i);
  }

  get _transactionLinesItems(): FormArray {
    return this.MainForm.get("_transactionLines") as FormArray
  }


  //////////////


  onChangePartner(event) {

    let changedValue = event.value;
    let domEvent = event.originalEvent;

    alert()

    console.log(changedValue)
    console.log(domEvent)
    console.log(this.SelectedPartener)


  }


  onChangeProduct(event) {

    let changedValue = event.value;
    let domEvent = event.originalEvent;

    alert()

    console.log(changedValue)
    console.log(domEvent)
    console.log(this.SelectedProduct)



    this.FA_items = this.MainForm.get('_transactionLines') as FormArray;
    this.FA_items.push(this.createItem(this.SelectedProduct.id, this.SelectedPartener.id, this.SelectedProduct.price));
  }












  OnFormSubmit() {
    console.log(this.MainForm.getRawValue());
    if (this.MainForm.valid) {
      this.TrxSvc.CreateTransaction(this.MainForm.getRawValue()).subscribe(res => {
        console.log(res)
        if (res) {
          this.CloseModal(true);
          this.alertifySvc.success('Successfully Created');
        }
      })
    }
  }
}
