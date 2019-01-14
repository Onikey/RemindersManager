import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReminderListResolver } from './services/reminders-list.resolver';
import { ReminderItemResolver } from './services/reminder-item.resolver';

import { DashboardComponent } from './dashboard.component';
import { RemindersListComponent } from './reminders-list/reminders-list.component';
import { RemindersDetailsComponent } from './reminders-details/reminders-details.component';
import { ReminderCreateComponent } from './reminder-create/reminder-create.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [{
            path: '',
            component: RemindersListComponent,
            resolve: {
                reminders: ReminderListResolver
            }
        }, {
            path: ':id',
            component: RemindersDetailsComponent,
            resolve: {
                reminder: ReminderItemResolver
            }
        }, {
            path: 'create',
            component: ReminderCreateComponent
        }]
    }
];

export const DashboardRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);
