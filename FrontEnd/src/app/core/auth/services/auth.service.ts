import { RegisterRequestModel } from './../models/register-request-model';
import { LoginRequestModel } from './../models/login-request-model';
import { LoginResponseModel } from './../models/login-response-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.baseUrl + 'Account';
  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private loginData = new BehaviorSubject<LoginResponseModel>(
    this.GetUserData()
  );
  constructor(private http: HttpClient, private router: Router) {}

  public Login(model: LoginRequestModel): Observable<LoginResponseModel> {
    return this.http.post<any>(`${this.baseUrl}/authenticate`, model).pipe(
      map((res) => {
        if (res && res.succeeded) localStorage.setItem('loginStatus', '1');
        localStorage.setItem('jwt', res.data.jwToken);
        localStorage.setItem('userName', res.data.userName);

        localStorage.setItem('loginData', JSON.stringify(res));
        this.loginData.next(res);
        this.loginStatus.next(true);

        return res;
      })
    );
  }

  public Register(model: RegisterRequestModel): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, model).pipe(
      map(
        (result) => {
          return result;
        },
        (error: any) => {
          return error;
        }
      )
    );
  }

  public signOut() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('loginStatus');
    localStorage.removeItem('userName');
    localStorage.removeItem('loginData');
    this.loginStatus.next(false);
    this.loginData.next({});
  }

  checkLoginStatus(): boolean {
    var loginCookie = localStorage.getItem('loginStatus');
    if (loginCookie == '1') {
      if (
        localStorage.getItem('jwt') === null ||
        localStorage.getItem('jwt') === undefined
      ) {
        return false;
      }
      return true;
    }
    return false;
  }

  GetUserData(): LoginResponseModel {
    let userData = localStorage.getItem('loginData');
    if (userData === null) {
      return {};
    }
    let data = JSON.parse(userData || '');
    if (data === null || data === undefined) {
      return {};
    }
    return data;
  }

  public get isLoggesIn() {
    return this.loginStatus.asObservable();
  }

  public get UserData() {
    return this.loginData.asObservable();
  }
}
