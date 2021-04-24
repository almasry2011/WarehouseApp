import { ComponentType } from '@angular/cdk/portal';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Subscription, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SearchCriteria } from '../../models/search-criteria';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css'],
})
export class BaseComponent<T> implements OnInit, OnDestroy {
  private baseUrl: string = environment.baseUrl;
  // dtOptions: DataTables.Settings = {};
  dtOptions: any = {};

  searchCriteria: SearchCriteria = { isPageLoad: false, filter: '' };
  dtTrigger: Subject<any> = new Subject();
  isDtInitialized: boolean = false;

  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;

  timerSubscription!: Subscription;

  PaggedData!: T[];
  SearchVal!: string;

  constructor(private http: HttpClient, public dialog: MatDialog) { }

  ngOnInit(): void { }

  InitDt(endPoint: string, columns: any): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      serverSide: true,
      processing: true,
      searching: false,
      autoWidth: true,
      lengthMenu: [5, 10, 25, 50, 75, 100],
      initComplete: function (settings: any, json: any) {
        $('div.loading').remove();

      },

      // dom: 'Bfrtip',
      // // Configure the buttons
      // buttons: [
      //   'columnsToggle',
      //   'colvis',
      //   'copy',
      //   'print',
      //   'excel',
      //   {
      //     text: 'Some button',
      //     key: '1',
      //     action: function (e: any, dt: any, node: any, config: any) {
      //       alert('Button activated');
      //     }
      //   }
      // ],

      // dom: 'Bfrtip',
      // //buttons: ['copy', 'csv', 'excel', 'print'],
      // buttons: [
      //   //'copy',

      //   'print',
      //   'csv',
      //   'columnsToggle',
      //   'colvis',
      //   'pdf',
      //   'excel',
      // ],


      ajax: (dataTablesParameters: any, callback: any) => {
        // debugger;
        dataTablesParameters.searchCriteria = this.searchCriteria;
        this.http
          .post<any>(this.baseUrl + endPoint, dataTablesParameters, {})
          .subscribe((resp) => {
            console.log(resp);
            this.PaggedData = resp.data;

            this.isDtInitialized = true;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: [],
            });
          });
      },

      columns: columns,
    };
  }

  CallngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  rerender(): void {
    // debugger;
    this.searchCriteria.isPageLoad = false;
    this.searchCriteria.filter = this.SearchVal;
    if (this.isDtInitialized) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    } else {
      this.isDtInitialized = true;
      this.dtTrigger.next();
    }
  }

  search() {
    this.rerender();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();

    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  private refreshData(): void {
    this.rerender();
    this.subscribeToData();
  }

  private subscribeToData(): void {
    this.refreshData();
  }

  OpenDilog(component: any, data: any = null, width: string = '700px', height: string = 'auto'): Observable<any> {
    const dialogRef = this.dialog
      .open(component, {
        width: width,
        height: height,
        disableClose: true,
        data: data,
      })
      .afterClosed();
    return dialogRef;
  }

  ConfirmDialog(message: string): Observable<any> {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false,
    });
    dialogRef.componentInstance.confirmMessage = message;
    return dialogRef.afterClosed();
  }
}
