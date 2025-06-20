import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  email: string = '';
  showOtpPopup = false;
  enteredOtp: string = '';
  otp: string = '';

  constructor(private router: Router, private appService: AppService) { }

  sendOtp() {
    this.appService.verify(this.email).subscribe({
      next: (res : any) => {
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
    console.log(this.enteredOtp, this.otp);
    if (this.enteredOtp == this.otp) {
      this.showOtpPopup = false;      
      this.otp = '';
      this.router.navigate(['/auth/change-password']);
      this.appService.setMessage(this.email);
    } else {
      Swal.fire("Please enter correct OTP !!"); 
    }
  }
}
