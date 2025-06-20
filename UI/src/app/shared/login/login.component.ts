import { Component } from '@angular/core';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userData = {
    username: "",
    password: ""
  }
  token: string = "";
  showPassword: boolean = false;

  constructor(private appService: AppService, private route: Router) { }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.appService.login(this.userData).subscribe({
      next: (res: any) => {
        this.token = res.token;
        sessionStorage.setItem('token', this.token);
        this.route.navigate(['/']);
      },
      error: (err) => {
        if (err.status === 404) {
          Swal.fire("User does not exist in database, please register before login !!");
        } else {
          Swal.fire("Invalid credentials !!");
        }
      }
    });
  }
}
