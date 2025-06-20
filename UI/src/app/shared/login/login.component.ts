import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  showPassword: boolean = false;
  token: string = '';
  loginForm: FormGroup;

  constructor(private appService: AppService, private route: Router, private fb: FormBuilder) { 
    this.loginForm = this.fb.group({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (this.loginForm.invalid) {
      Swal.fire("Please fill in all required fields!");
      return;
    }

    const userData = this.loginForm.value;
    this.appService.login(userData).subscribe({
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
