import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {

  menu = false;
  
  toggleMenu() {
    this.menu = !this.menu;
  }

  logout() {
    sessionStorage.removeItem('token');
  }
}
