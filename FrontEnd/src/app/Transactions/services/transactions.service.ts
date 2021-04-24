import { TransactionModel } from './../models/transaction-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private baseUrl: string = environment.baseUrl + 'Transaction';
  constructor(private http: HttpClient) { }

  getTransactions(): Observable<TransactionModel[]> {
    return this.http.get<TransactionModel[]>(`${this.baseUrl}/GetAll`);
  }
  getTransaction(id: number): Observable<TransactionModel> {
    return this.http.get<TransactionModel>(`${this.baseUrl}/${id}`);
  }

  CreateTransaction(model: TransactionModel): Observable<boolean> {
    return this.http.post<any>(`${this.baseUrl}`, model);
  }

  UpdateTransaction(model: TransactionModel): Observable<boolean> {
    return this.http.put<any>(`${this.baseUrl}`, model);
  }

  DeleteTransaction(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }






}
