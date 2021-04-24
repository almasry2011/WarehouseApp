import { Router } from '@angular/router';
import { AuthService } from './../../auth/services/auth.service';
import { LoginResponseModel } from './../../auth/models/login-response-model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() isLoggedIn: boolean = false;
  @Input() LoginData!: LoginResponseModel;
  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {}

  signOut() {
    this.authSrv.signOut();
    this.router.navigate(['/auth/login']);
  }
}
