import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  showPassword: boolean = false;

  constructor(private fb: FormBuilder, private appService: AppService, private route: Router) {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  register() {
    if (this.registerForm.invalid) {
      Swal.fire("Please fill in all required fields correctly!");
      return;
    }

    const userData = this.registerForm.value;

    this.appService.register(userData).subscribe({
      next: (res: any) => {
        this.route.navigate(['auth/login']);
      },
      error: (err) => {
        if (err.status === 500) {
          Swal.fire("Username already exists, please use another username!");
        } else {
          Swal.fire("Registration failed. Please try again.");
        }
      }
    });
  }
}
