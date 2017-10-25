import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.isActive()) {
      this.router.navigate(['/admin']);
    }

  }

  login(loginForm: NgForm) {
    this.authService.login(loginForm.value.userName, loginForm.value.password).then((res, rej) => {
      if (res) {
        this.router.navigate(['/admin']);
      }
    });
  }

}
