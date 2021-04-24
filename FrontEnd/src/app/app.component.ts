import { AuthService } from './core/auth/services/auth.service';
import { Component } from '@angular/core';
import { LoginResponseModel } from './core/auth/models/login-response-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'FrontEnd';
  constructor(private authSvc: AuthService) { }
  isLoggedIn: boolean = false;
  UserData!: LoginResponseModel;

  ootions = [{ name: "AAAA", id: 1 }, { name: "bbbbbb", id: 2 }];
  ngOnInit(): void {
    this.authSvc.isLoggesIn.subscribe((s) => {
      this.isLoggedIn = s;
    });

    this.authSvc.UserData.subscribe((data) => {
      this.UserData = data;
    });
  }
}
