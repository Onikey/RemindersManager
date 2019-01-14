import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {
    MatTableModule, MatButtonModule, MatCardModule,
    MatFormFieldModule, MatInputModule, MatSlideToggleModule
} from '@angular/material';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { DashboardRoutingModule } from './dashboard.routing';

import { RemindersService } from './services/reminders.service';
import { ReminderListResolver } from './services/reminders-list.resolver';
import { ReminderItemResolver } from './services/reminder-item.resolver';

import { DashboardComponent } from './dashboard.component';
import { RemindersListComponent } from './reminders-list/reminders-list.component';
import { ReminderFormComponent } from './reminder-form/reminder-form.component';

@NgModule({
    declarations: [
        DashboardComponent,
        RemindersListComponent,
        ReminderFormComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatTableModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        DashboardRoutingModule
    ],
    providers: [RemindersService, ReminderListResolver, ReminderItemResolver]
})
export class DashboardModule { }
