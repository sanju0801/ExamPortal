import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '../../app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isCollapsed = false;
  isMobileView = false;
  resizeListener!: () => void;
  private subscription!: Subscription;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.checkScreenSize();
    this.resizeListener = this.checkScreenSize.bind(this);
    window.addEventListener('resize', this.resizeListener);

    this.subscription = this.appService.isCollapsed$.subscribe(res => {
      this.isCollapsed = res;
    });
  }

  checkScreenSize() {
    this.isMobileView = window.innerWidth <= 768;
    if (this.isMobileView) {
      this.appService.setCollapsed(true);
    }
  }

  toggleSidebar() {
    this.appService.toggleSidebar();
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeListener);
    this.subscription.unsubscribe();
  }
}
