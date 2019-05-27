import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  private spinnerSubject = new Subject<boolean>();

  public spinnerState = this.spinnerSubject.asObservable();

  public show() {
    this.spinnerSubject.next(true);
  }

  public hide() {
    this.spinnerSubject.next(false);
  }
}
