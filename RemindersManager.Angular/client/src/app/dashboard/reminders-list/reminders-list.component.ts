import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatTableDataSource } from '@angular/material';

import { RemindersService } from '../services/reminders.service';

import Reminder from '../models/reminder.model';

@Component({
  selector: 'app-reminders-list',
  templateUrl: './reminders-list.component.html',
  styleUrls: ['./reminders-list.component.scss']
})
export class RemindersListComponent implements OnInit {

  private reminders = new Array<Reminder>();

  public dataSource: MatTableDataSource<Reminder>;
  public displayedColumns = ['subject', 'notes', 'remindDate', 'isActive', 'edit'];

  constructor(private route: ActivatedRoute, private dataService: RemindersService) { }

  ngOnInit() {
    this.reminders = this.route.snapshot.data['reminders'];
    this.dataSource = new MatTableDataSource(this.reminders);
  }

  public activate(id: string) {
    this.dataService.activate(id)
      .toPromise()
      .catch(() => {
        this.reminders[this.reminders.findIndex(x => x.id === id)].isActive = false;
        this.refreshDataSource();
      });
  }

  public async deactivate(id: string) {
    this.dataService.deactivate(id).subscribe({
      error() {
        this.reminders[this.reminders.findIndex(x => x.id === id)].isActive = true;
        this.refreshDataSource();
      }
    });
  }

  public delete(id: string) {
    this.dataService.delete(id).subscribe((res) => {
      this.reminders = this.reminders.filter(x => x.id !== id);
      this.refreshDataSource();
    });
  }

  private refreshDataSource() {
    // possibly memory leak or UI glitch
    this.dataSource = new MatTableDataSource(this.reminders);
  }

}
