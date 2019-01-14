import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReminderListResolver } from './services/reminders-list.resolver';
import { ReminderItemResolver } from './services/reminder-item.resolver';

import { DashboardComponent } from './dashboard.component';
import { RemindersListComponent } from './reminders-list/reminders-list.component';
import { ReminderFormComponent } from './reminder-form/reminder-form.component';

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
            path: 'create',
            component: ReminderFormComponent
        }, {
            path: ':id',
            component: ReminderFormComponent,
            resolve: {
                reminder: ReminderItemResolver
            }
        }]
    }
];

export const DashboardRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
