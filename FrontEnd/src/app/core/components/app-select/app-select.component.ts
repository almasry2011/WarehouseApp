import { ProductsService } from './../../../products/services/products.service';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-app-select',
  templateUrl: './app-select.component.html',
  styleUrls: ['./app-select.component.css']
})
export class AppSelectComponent implements OnInit {
  @Input() options = [];
  @Input() Service;
  @Input() BindLabel;
  @Input() BindValue;
  @Input() Placeholder;
  @Input() readonly;
  @Input() clearOnSelect = false;

  SelectedItem = null;

  @Output() selectedOptionChange: EventEmitter<object | string> = new EventEmitter<object | string>();



  data = [];
  dataBuffer = [];
  pageNumber: number = 0;
  pageSize: number = 3;
  filter_values: string = "";

  TotalPages = 0;
  TotalRecords = 0;



  loading = false;



  ngOnInit() {
    this.Service.getAll(this.pageNumber, this.pageSize, this.filter_values)
      .subscribe(_data => {
        this.data = _data.data;
        this.TotalPages = _data.totalPages;
      });
  }

  onScrollToEnd() {
    this.fetchMore();
  }

  onScroll({ end }) {
    if (this.loading || this.pageNumber > this.TotalPages) {
      return;
    }

    if (this.data.length <= this.pageSize) {
      this.fetchMore();
    }
  }

  private fetchMore() {
    this.loading = true;
    this.Service.getAll(this.pageNumber, this.pageSize, this.filter_values)
      .subscribe(_data => {


        this.pageNumber += 1;

        setTimeout(() => {
          this.loading = false;
          this.data = this.data.concat(_data.data);
        }, 200)
      });

  }
  onChange(event) {
    console.log(event)
    this.selectedOptionChange.emit(event);

    if (this.clearOnSelect) {
      setTimeout(() => this.SelectedItem = null);
    }

  }

  customSearchFn(term: string, item: any) {
    term = term.toLowerCase();


    return item.name.toLowerCase().indexOf(term) > -1 || item.name.toLowerCase() === term;
  }



}
