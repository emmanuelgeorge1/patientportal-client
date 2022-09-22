import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from 'src/app/dashboard/services/profile.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ViewCalanderComponent } from '../view-calander/view-calander.component';
import { PhysicianData } from '../../models/physician-data';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexLegend,
  ApexFill,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
};
@Component({
  selector: 'app-appoinment-calendar',
  templateUrl: './appoinment-calendar.component.html',
  styleUrls: ['./appoinment-calendar.component.css'],
})
export class AppoinmentCalendarComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  elementData: Array<PhysicianData>;
  names: Array<PhysicianData>;
  selectedObj: string;
  selectedStatus: string;
  selectedSpecialty: string;
  boolean: boolean = false;
  constructor(
    private profileService: ProfileService,
    private dialog: MatDialog
  ) {
    this.chartOptions = {
      series: [
        {
          name: 'Total Appoinments',
          data: [JSON.parse(localStorage.getItem('totalAppointments'))],
        },
        {
          name: 'Appproved Appoinments',
          data: [JSON.parse(localStorage.getItem('approvedAppointment'))],
        },
        {
          name: 'Pending Appoinments',
          data: [JSON.parse(localStorage.getItem('pendingAppointments'))],
        },
        {
          name: 'Rejected Appoinments',
          data: [JSON.parse(localStorage.getItem('rejectedAppointments'))],
        },
      ],
      chart: {
        type: 'bar',
        height: 350,

        stacked: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      xaxis: {
        type: 'category',
        categories: ['Appointments '],
      },
      legend: {
        position: 'right',
        offsetY: 40,
      },
      fill: {
        opacity: 1,
      },
    };
  }

  ngOnInit(): void {
    this.profileService.getPhysicianData().subscribe(
      (res) => {
        this.elementData = res;
      },
      (err) => {
        console.log('Error::::', JSON.stringify(err));
      }
    );
  }
  changeSpecialty(count) {
    let speciality = count.value;
    this.names = this.elementData.filter((doc) => doc.speciality == speciality);
    console.log(this.names);
  }
  onSelected(value: string) {
    this.selectedObj = value;
    this.boolean = true;
  }

  viewAppointment() {
    localStorage.setItem('docName', JSON.stringify(this.selectedObj));
    localStorage.setItem('status', JSON.stringify(this.selectedStatus));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.height = '85%';
    this.dialog.open(ViewCalanderComponent, dialogConfig);
  }
}
