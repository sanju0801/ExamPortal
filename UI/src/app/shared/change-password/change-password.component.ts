import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit {
  password = {
    oldPassword: "",
    newPassword1: "",
    newPassword2: ""
  }
  showOldPassword: boolean = false;
  showNewPassword1: boolean = false;
  showNewPassword2: boolean = false;
  email: string = "";
  user: any;

  constructor(private appService: AppService, private route: Router) { }

  ngOnInit(): void {
    this.appService.getMessage.subscribe((res: any) => {
      this.email = res;
    })
  }

  changePassword() {
    const obj = {
      "email": this.email,
      "newPassword": this.password.newPassword1,
      "oldPassword": this.password.oldPassword
    }
    this.appService.updatePassword(obj).subscribe({
      next: (res: any) => {
        Swal.fire(res);
        this.route.navigate(["/auth/login"])
      }, 
      error: (err) => {
        if(err.status == 404) {
          Swal.fire("User does not exist in database, please register before login !!");
        } else if (err.status == 401) {
          Swal.fire("Incorrect old password !!");
        } else {
          Swal.fire("Something went wrong !!");
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
