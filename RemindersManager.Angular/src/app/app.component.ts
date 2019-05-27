import { Component, OnInit } from '@angular/core';
import { NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Router, Event } from '@angular/router';

import { SpinnerService } from './core/spinner/spinner.service';

@Component({
  selector: 'app-root',
  template: `
    <app-spinner></app-spinner>
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  constructor(private readonly spinnerService: SpinnerService, private readonly router: Router) { }

  ngOnInit() {
    this.router.events
      .subscribe((event: Event) => this.navigationInterceptor(event));
  }

  private navigationInterceptor(event: Event): void {
    switch (event.constructor) {
      case NavigationStart:
        this.spinnerService.show();
        break;
      case NavigationEnd:
      case NavigationCancel:
      case NavigationError:
        this.spinnerService.hide();
        break;
    }
  }
}
