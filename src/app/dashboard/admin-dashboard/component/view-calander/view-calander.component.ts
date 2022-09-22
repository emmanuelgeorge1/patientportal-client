import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EventSettingsModel, View } from '@syncfusion/ej2-angular-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { AppoinmentCalendarComponent } from '../appoinment-calendar/appoinment-calendar.component';
@Component({
  selector: 'app-view-calander',
  templateUrl: './view-calander.component.html',
  styleUrls: ['./view-calander.component.css'],
})
export class ViewCalanderComponent implements OnInit {
  public data: DataManager;
  public setView: View = 'Month';
  public isReadOnly: boolean = true;
  constructor(public dialogRef: MatDialogRef<AppoinmentCalendarComponent>) {}
  eventData: DataManager = new DataManager({
    url:
      'http://localhost:5001/api/profile/dataSources/' +
      JSON.parse(localStorage.getItem('docName')) +
      '/' +
      JSON.parse(localStorage.getItem('status')),
    adaptor: new WebApiAdaptor(),
    crossDomain: true,
  });
  public eventObject: EventSettingsModel = {
    dataSource: this.eventData,
  };
  ngOnInit(): void {}
  onClose() {
    this.dialogRef.close();
    localStorage.removeItem('docName');
    localStorage.removeItem('status');
  }
}
