import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppHttpClient, AuthHttpClient } from './http-clients';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AppHttpClient,
    AuthHttpClient
  ]
})
export class CoreModule { }
