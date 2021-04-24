import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductModel } from '../models/product-model';
import { ProductCreateModel } from '../models/product-create-model';
import { PagedResponse } from 'src/app/core/models/paged-response';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl: string = environment.baseUrl + 'product';
  constructor(private http: HttpClient) { }

  getAll(pageNumber: number, pageSize: number, search: string = ""): Observable<PagedResponse<ProductModel>> {
    return this.http.get<PagedResponse<ProductModel>>(`${this.baseUrl}/GetAll?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`);
  }
  getProduct(id: number): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${this.baseUrl}/${id}`);
  }

  CreateProduct(model: ProductCreateModel): Observable<boolean> {
    return this.http.post<any>(`${this.baseUrl}`, model);
  }

  UpdateProduct(model: ProductModel): Observable<boolean> {
    return this.http.put<any>(`${this.baseUrl}`, model);
  }

  DeleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
