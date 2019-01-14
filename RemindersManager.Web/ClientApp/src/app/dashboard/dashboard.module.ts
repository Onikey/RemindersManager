import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatDatepickerModule } from '@angular/material';

import { DashboardRoutingModule } from './dashboard.routing';

import { RemindersService } from './services/reminders.service';
import { ReminderListResolver } from './services/reminders-list.resolver';
import { ReminderItemResolver } from './services/reminder-item.resolver';

import { DashboardComponent } from './dashboard.component';
import { RemindersListComponent } from './reminders-list/reminders-list.component';
import { RemindersDetailsComponent } from './reminders-details/reminders-details.component';
import { ReminderCreateComponent } from './reminder-create/reminder-create.component';

@NgModule({
    declarations: [
        DashboardComponent,
        RemindersListComponent,
        RemindersDetailsComponent,
        ReminderCreateComponent
    ],
    imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        DashboardRoutingModule
    ],
    providers: [RemindersService, ReminderListResolver, ReminderItemResolver]
})
export class DashboardModule { }
