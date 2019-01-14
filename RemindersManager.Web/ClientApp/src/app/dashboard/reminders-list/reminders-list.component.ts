import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatSort, MatTableDataSource } from '@angular/material';

import { RemindersService } from '../services/reminders.service';

import Reminder from '../models/reminder.model';

@Component({
    selector: 'app-reminders-list',
    templateUrl: './reminders-list.component.html',
    styleUrls: ['./reminders-list.component.css']
})
export class RemindersListComponent implements OnInit {

    constructor(private route: ActivatedRoute, private dataService: RemindersService) { }

    dataSource: MatTableDataSource<Reminder>;
    displayedColumns = ['subject', 'notes', 'remindDate', 'isActive', 'edit'];

    ngOnInit() {
        const reminders = this.route.snapshot.data['reminders'];
        this.dataSource = new MatTableDataSource(reminders);
    }

    public activate(id: string) {
        this.dataService.activate(id).subscribe();
    }

    public deactivate(id: string) {
        this.dataService.deactivate(id).subscribe();
    }

}
