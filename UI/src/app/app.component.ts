import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  isCollapsed = false;
  isMobileView = false;
  resizeListener!: () => void;
  private subscription!: Subscription;

  constructor(private router: Router, private appService: AppService) { }

  ngOnInit() {
    this.checkScreenSize();
    this.resizeListener = this.checkScreenSize.bind(this);
    window.addEventListener('resize', this.resizeListener);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn = !event.url.includes('/auth');
      }
    });

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

  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeListener);
    this.subscription.unsubscribe();
  }
}