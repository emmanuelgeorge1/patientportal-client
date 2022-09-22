import { Component, OnInit } from '@angular/core';
import { EventSettingsModel, View } from '@syncfusion/ej2-angular-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
@Component({
  selector: 'app-physician-home',
  templateUrl: './physician-home.component.html',
  styleUrls: ['./physician-home.component.css'],
})
export class PhysicianHomeComponent implements OnInit {
  public data: DataManager;
  constructor() {}
  public setView: View = 'Month';
  public isReadOnly: boolean = true;
  private eventData: DataManager = new DataManager({
    url:
      'http://localhost:5001/api/profile/dataSource/' +
      JSON.parse(localStorage.getItem('physicianDetails')).name,
    adaptor: new WebApiAdaptor(),
    crossDomain: true,
  });

  public eventObject: EventSettingsModel = {
    dataSource: this.eventData,
  };
  ngOnInit(): void {}
}
