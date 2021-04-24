import { RegisterRequestModel } from './../../models/register-request-model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { AuthService } from '../../services/auth.service';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private authSrv: AuthService,
    private alertifySvc: AlertifyService,
    private router: Router
  ) {}
  errors: Array<string> = [];
  model: RegisterRequestModel = {};
  ngOnInit(): void {}

  Register() {
    console.log(this.model);
    this.authSrv.Register(this.model).subscribe(
      (res) => {
        console.log(res);
        this.alertifySvc.success('Successfully Registerd ');
        this.router.navigate(['/auth/login']);
      },
      (error) => {
        debugger;
        console.log(error);
        this.errors = [];
        this.errors.push(error.error.errors);
      }
    );
  }
}
