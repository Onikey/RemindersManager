import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { SpinnerService } from './core/spinner/spinner.service';

@Component({
    selector: 'app-spinner',
    template: ` <div [hidden]="!(spinnerState$ | async)">
                    <div class="spinner-container">
                          <object type="image/svg+xml" data="../assets/spinner.svg"  src="../assets/spinner.svg">
                            Loading...
                          </object>
                    </div>
                    <div class="spinner-background"></div>
                </div>`,
    styles: [
        `.spinner-background {
            position: fixed;
            background: rgba(0, 0, 0, 0.5);
            width: 100%;
            height: 100%;
            z-index: 499999;
            top:0;
        }
        .spinner-container {
            position: fixed;
            width:100%;
            top:45%;
            left: 50%;
            margin-left: -50px;
            opacity: .9;
            z-index: 500000;
        }`
    ]
})
export class SpinnerComponent implements OnInit {
    public spinnerState$: Observable<boolean>;

    constructor(private readonly spinnerService: SpinnerService) { }

    ngOnInit() {
        this.spinnerState$ = this.spinnerService.spinnerState;
    }
}
