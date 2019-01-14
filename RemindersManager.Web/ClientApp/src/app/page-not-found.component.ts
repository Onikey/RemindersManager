import { Component } from '@angular/core';

@Component({
    selector: 'app-page-not-found',
    template: `<h1>Page not found</h1><h3><a [routerLink]="['/']">Return to home page</a></h3>`
})
export class PageNotFoundComponent { }
