import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/auth';

import { PageNotFoundComponent } from './page-not-found.component';
import { LoginComponent } from './auth/login.component';
import { AuthCallbackComponent } from './auth/auth-callback.component';

const appRoutes: Routes = [
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'auth/callback',
    component: AuthCallbackComponent,
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(appRoutes);
