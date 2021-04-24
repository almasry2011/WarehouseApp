import { PartnerFormComponent } from './../partner-form/partner-form.component';
import { PartnersService } from './../../services/partners.service';
import { PartnerModel } from './../../models/partner-model';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/components/base/base.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-partner-index',
  templateUrl: './partner-index.component.html',
  styleUrls: ['./partner-index.component.css']
})
export class PartnerIndexComponent extends BaseComponent<PartnerModel>
  implements OnInit, AfterViewInit {


  constructor(
    private partSvc: PartnersService,
    http: HttpClient,
    dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    super(http, dialog);
  }

  ngOnInit(): void {
    let columns = [
      { data: 'id' },
      { data: 'name' },
      { data: 'country' },
      { data: '_address' },
      { data: '' },
    ];
    this.InitDt('Partners/GetDataTablePaggedList', columns);
  }

  ngAfterViewInit(): void {
    this.CallngAfterViewInit();
  }

  Add(): void {
    this.OpenDilog(PartnerFormComponent).subscribe(
      (data) => {
        console.log('After Closed Data' + data);
        console.log(data);
        this.rerender();
      }
    );
  }

  Edit(Id: number): void {
    debugger;

    this.partSvc.getPartner(Id).subscribe(data => {

      if (data != null) {
        this.OpenDilog(PartnerFormComponent, data).subscribe(
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
          this.partSvc.DeletePartner(Id).subscribe(res => {
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
