import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserAnimationsModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
