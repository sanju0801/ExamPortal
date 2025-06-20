import { Component } from '@angular/core';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  userData = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    email: "",
    phone: "",
  }
  showPassword: boolean = false;

  constructor(private appService: AppService, private route: Router) { }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  register() {
    this.appService.register(this.userData).subscribe({
      next: (res: any) => {
        this.route.navigate(['auth/login']);
      },
      error: (err) => {
        if (err.status === 500) {
          Swal.fire("Username already exist, please use other username !!");
        }
      }
    })
  }
}
