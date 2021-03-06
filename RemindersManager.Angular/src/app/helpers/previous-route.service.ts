import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable()
export class PreviousRouteService {
  private _previousUrl: string;
  private _currentUrl: string;

  public get previousUrl() {
    return this._previousUrl;
  }

  constructor(private router: Router) {
    this._currentUrl = this.router.url;
    router.events
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          this._previousUrl = this._currentUrl;
          this._currentUrl = event.url;
        }
      });
  }
}
