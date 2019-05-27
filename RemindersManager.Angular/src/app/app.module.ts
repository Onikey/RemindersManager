import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app.routing';

import { PreviousRouteService } from './helpers/previous-route.service';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { LoginComponent } from './auth/login.component';
import { AuthCallbackComponent } from './auth/auth-callback.component';
import { SpinnerComponent } from './spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    AuthCallbackComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CoreModule,
    AppRoutingModule
  ],
  providers: [PreviousRouteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
