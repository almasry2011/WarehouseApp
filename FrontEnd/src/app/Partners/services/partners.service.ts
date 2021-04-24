import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResponse } from 'src/app/core/models/paged-response';
import { environment } from 'src/environments/environment';
import { PartnerModel } from '../models/partner-model';

@Injectable({
  providedIn: 'root'
})
export class PartnersService {

  private baseUrl: string = environment.baseUrl + 'Partners';
  constructor(private http: HttpClient) { }



  getAll(pageNumber: number, pageSize: number, search: string = ""): Observable<PagedResponse<PartnerModel>> {
    return this.http.get<PagedResponse<PartnerModel>>(`${this.baseUrl}/GetAll?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`);
  }
  getPartner(id: number): Observable<PartnerModel> {
    return this.http.get<PartnerModel>(`${this.baseUrl}/${id}`);
  }

  CreatePartner(model: PartnerModel): Observable<boolean> {
    return this.http.post<any>(`${this.baseUrl}`, model);
  }

  UpdatePartner(model: PartnerModel): Observable<boolean> {
    return this.http.put<any>(`${this.baseUrl}`, model);
  }

  DeletePartner(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }








}
