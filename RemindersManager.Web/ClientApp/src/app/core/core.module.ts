import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppHttpClient, AuthHttpClient } from './http-clients';
import { ErrorInterceptor } from './helpers';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
      AppHttpClient,
      AuthHttpClient,
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ]
})
export class CoreModule { }
