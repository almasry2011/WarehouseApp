import { Router } from '@angular/router';
import { AlertifyService } from './../../../services/alertify.service';
import { LoginRequestModel } from './../../models/login-request-model';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authSrv: AuthService,
    private alertifySvc: AlertifyService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  model: LoginRequestModel = {};

  login() {
    this.authSrv.Login(this.model).subscribe(
      (data) => {
        console.log(data);
        if (data.succeeded) {
          this.alertifySvc.success('Login Success');
          this.router.navigate(['/']);
        }
      },
      (error) => {
        console.log(error);
        this.alertifySvc.error(error.message);
      }
    );
    console.log(this.model);
  }
}
