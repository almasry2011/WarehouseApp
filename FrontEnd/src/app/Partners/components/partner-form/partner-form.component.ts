import { PartnersService } from './../../services/partners.service';
import { PartnerModel } from './../../models/partner-model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertifyService } from 'src/app/core/services/alertify.service';

@Component({
  selector: 'app-partner-form',
  templateUrl: './partner-form.component.html',
  styleUrls: ['./partner-form.component.css']
})
export class PartnerFormComponent implements OnInit {

  title: string = "Edit Partner"
  IsCreateForm: boolean = false;
  MainForm!: FormGroup;

  id!: FormControl;
  name!: FormControl;
  street!: FormControl;
  city!: FormControl;
  country!: FormControl;
  zipCode!: FormControl;


  constructor(
    public dialogRef: MatDialogRef<PartnerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PartnerModel,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private PartnerSvc: PartnersService,
    private alertifySvc: AlertifyService
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    if (this.data == null) {
      this.data = {};
      this.IsCreateForm = true;
      this.title = "Add Partner";
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
    this.street = new FormControl(
      this.data.street,
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(200),
      ])
    );
    this.city = new FormControl(
      this.data.city,
      Validators.compose([Validators.required, Validators.min(1)])
    );
    this.country = new FormControl(
      this.data.country,
      Validators.compose([Validators.required, Validators.min(1)])
    );

    this.zipCode = new FormControl(
      this.data.zipCode,
      Validators.compose([Validators.required, Validators.min(1)])
    );

    this.MainForm = this.fb.group({
      id: this.id,
      name: this.name,
      street: this.street,
      city: this.city,
      country: this.country,
      zipCode: this.zipCode,
    });
  }

  OnFormSubmit() {
    if (this.MainForm.valid) {
      console.log(this.MainForm.value);

      if (this.IsCreateForm) {
        this.PartnerSvc.CreatePartner(this.MainForm.value).subscribe(res => {
          console.log(res)
          if (res) {
            this.CloseModal(true);
            this.alertifySvc.success('Successfully Created');
          }
        })
      } else {
        this.PartnerSvc.UpdatePartner(this.MainForm.value).subscribe(res => {
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
