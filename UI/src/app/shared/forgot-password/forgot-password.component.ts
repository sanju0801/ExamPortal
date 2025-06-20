import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  showOtpPopup = false;
  enteredOtp: string = '';
  otp: string = '';
  forgotPasswordForm: FormGroup;

  constructor(private router: Router, private appService: AppService, private fb: FormBuilder) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', Validators.required],
    })
  }

  sendOtp() {
    if (this.forgotPasswordForm.invalid) {
      Swal.fire("Please fill in all required fields correctly!");
      return;
    }

    this.appService.verify(this.forgotPasswordForm.get('email')?.value).subscribe({
      next: (res: any) => {
        this.otp = res.OTP;
        this.showOtpPopup = true;
      },
      error: (err) => {
        if (err.status === 404) {
          Swal.fire("User does not exist in database, please register before login !!");
        } else {
          Swal.fire("Something went wrong !!");
        }
      }
    });
  }

  verifyOtp() {
    if (this.enteredOtp == this.otp) {
      this.showOtpPopup = false;
      this.otp = '';
      this.router.navigate(['/auth/change-password']);
      this.appService.setMessage(this.forgotPasswordForm.get("email")?.value);
    } else {
      Swal.fire("Please enter correct OTP !!");
    }
  }
}
