import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  showOldPassword: boolean = false;
  showNewPassword1: boolean = false;
  showNewPassword2: boolean = false;
  email: string = "";

  constructor(private fb: FormBuilder, private appService: AppService, private route: Router) {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword1: ['', [Validators.required]],
      newPassword2: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.appService.getMessage.subscribe((res: any) => {
      this.email = res;
    });
  }

  changePassword() {
    if (this.changePasswordForm.invalid) {
      Swal.fire("Please fill in all fields correctly.");
      return;
    }

    const { oldPassword, newPassword1, newPassword2 } = this.changePasswordForm.value;

    if (newPassword1 !== newPassword2) {
      Swal.fire("New passwords do not match!");
      return;
    }

    const obj = {
      email: this.email,
      oldPassword: oldPassword,
      newPassword: newPassword1
    };

    this.appService.updatePassword(obj).subscribe({
      next: (res: any) => {
        Swal.fire(res);
        this.route.navigate(["/auth/login"]);
      },
      error: (err) => {
        if (err.status === 404) {
          Swal.fire("User does not exist in database, please register before login!");
        } else if (err.status === 401) {
          Swal.fire("Incorrect old password!");
        } else {
          Swal.fire("Something went wrong!");
        }
      }
    });
  }

  toggleOldPasswordVisibility() {
    this.showOldPassword = !this.showOldPassword;
  }

  toggleNewPassword1Visibility() {
    this.showNewPassword1 = !this.showNewPassword1;
  }

  toggleNewPassword2Visibility() {
    this.showNewPassword2 = !this.showNewPassword2;
  }
}
