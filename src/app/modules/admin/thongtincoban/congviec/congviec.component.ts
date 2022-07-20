import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { Router, ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { NotifierService } from 'angular-notifier';
import { UserService } from 'app/core/user/user.service';
import moment from 'moment';
import { ApexAxisChartSeries, ApexChart, ApexFill, ApexDataLabels, ApexGrid, ApexYAxis, ApexXAxis, ApexPlotOptions, ChartComponent } from 'ng-apexcharts';
import { Subject,takeUntil } from 'rxjs';
import { ScrumboardService } from '../../apps/scrumboard/scrumboard.service';
import { NhanvienService } from '../../baocao/nhanvien/nhanvien.service';
import { CauhinhService } from '../../cauhinh/cauhinh.service';
import { Cauhinh } from '../../cauhinh/cauhinh.types';
import { CongviecService } from './congviec.service';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  fill: ApexFill;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  plotOptions: ApexPlotOptions;
};
@Component({
  selector: 'app-congviec',
  templateUrl: './congviec.component.html',
  styleUrls: ['./congviec.component.scss']
})
export class CongviecComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  Vitri: any;
  CUser: any;
  ThisDuan: any;
  Duans: any[];
  filteredDuans: any[];
  Groups: any[];
  filteredGroups: any[];
  Tasks: any[];
  filteredTasks: any[];
  Nhanviens: any[];
  filteredNhanviens: any[];
  GroupbyUser:any[];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  @ViewChild('drawer1', {static: true}) drawer1: MatDrawer;
  CurretTask:any;
  Menuwidth:any;
  triggerOrigin: any;
  triggerType:any[]=[];
  CBoards:any[]=[];
  ShowChart:number = 1;
  constructor(
    private _scrumboardService: ScrumboardService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseConfirmationService: FuseConfirmationService,
    private _congviecService: CongviecService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _notifierService: NotifierService,
    private _userService: UserService,
    private _nhanvienServiceService: NhanvienService,
    private _cauhinhService: CauhinhService,
    private _dialog: MatDialog
  ) {
    this.chartOptions = {
      series: [
        {
          data: [
            {
              x: "Analysis",
              y: [
                new Date("2019-02-27").getTime(),
                new Date("2019-03-04").getTime()
              ],
              fillColor: "#008FFB"
            },
            {
              x: "Design",
              y: [
                new Date("2019-03-04").getTime(),
                new Date("2019-03-08").getTime()
              ],
              fillColor: "#00E396"
            },
            {
              x: "Coding",
              y: [
                new Date("2019-03-07").getTime(),
                new Date("2019-03-10").getTime()
              ],
              fillColor: "#775DD0"
            },
            {
              x: "Testing",
              y: [
                new Date("2019-03-08").getTime(),
                new Date("2019-03-12").getTime()
              ],
              fillColor: "#FEB019"
            },
            {
              x: "Deployment",
              y: [
                new Date("2019-03-12").getTime(),
                new Date("2019-03-17").getTime()
              ],
              fillColor: "#FF4560"
            }
          ]
        }
      ],
      chart: {
        height: 350,
        type: "rangeBar"
      },
      plotOptions: {
        bar: {
          horizontal: true,
          distributed: true,
          dataLabels: {
            hideOverflowingLabels: false
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val, opts) {
          var label = opts.w.globals.labels[opts.dataPointIndex];
          var a = moment(val[0]);
          var b = moment(val[1]);
          var diff = b.diff(a, "days");
          return label + ": " + diff + (diff > 1 ? " days" : " day");
        },
        style: {
          colors: ["#f3f4f5", "#fff"]
        }
      },
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        show: false
      },
      grid: {
        row: {
          colors: ["#f3f4f5", "#fff"],
          opacity: 1
        }
      }
    };
    this._userService.user$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((data) => {
        this.CUser = data;
        this._changeDetectorRef.markForCheck();
    });

    this._nhanvienServiceService.nhanviens$
    .subscribe((data) => {
        this.Nhanviens =  this.filteredNhanviens = data;
        this._changeDetectorRef.markForCheck();
    });
    this._cauhinhService.getCauhinhs().subscribe();
    this._cauhinhService.Cauhinhs$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((data: Cauhinh[]) => {
         this.Vitri = data.find(v=>v.id =="ea424658-bc53-4222-b006-44dbbf4b5e8b").detail;
        this._changeDetectorRef.markForCheck();
    });
      this._congviecService.getAllDuans().subscribe();
      this._congviecService.duans$.subscribe((data) => {
          this.Duans = this.filteredDuans = data.filter(v=>v.Thamgia.some(v1=>v1==this.CUser.id))
          this._changeDetectorRef.markForCheck();
      })
      this._congviecService.duan$.subscribe((data) => {
        this.ThisDuan = data; 
        this._changeDetectorRef.markForCheck();
      })

      this._congviecService.getAllGrouptasks().subscribe();
      this._congviecService.grouptasks$.subscribe((data) => {
        this.Groups = this.filteredGroups = data;
        this._changeDetectorRef.markForCheck();
      })
        this._congviecService.getAllTasks().subscribe();
        this._congviecService.tasks$.subscribe((data) => {
          this.Tasks = this.filteredTasks = data.filter(v=>v.idTao==this.CUser.id||v.Thuchien==this.CUser.id);
          this._changeDetectorRef.markForCheck();
      })
      this._congviecService.Showchart$.subscribe((data) => {
        this.ShowChart = data||1;
        this._changeDetectorRef.markForCheck();
    })
  }

  ngOnInit(): void {
    this.Groups = [
      {id: '0',Tieude: 'Chưa Làm'},
      {id: '1',Tieude: 'Đang Làm'},
      {id: '2',Tieude: 'Hoàn Thành'}
    ]
    this.Groups.forEach(v => {v.tasks = this.Tasks.filter(v1=>v1.Trangthai==v.id)});
    this.CBoards = this.Groups;      
      this.drawer1.openedChange.subscribe((opened) => {
        if (!opened)
        {
          this._router.navigate(['./',this.ThisDuan.id], {relativeTo: this._activatedRoute});
            this._changeDetectorRef.markForCheck();
        }
    });
  }
  SetChart(value)
  {
    this._congviecService.setShowchart(value);
  }
  filterDuan(event): void
  {
    const value = event.target.value.toLowerCase();
    this.filteredDuans = this.Duans.filter(v => v.Tieude.toLowerCase().includes(value));
  }
  Menutoggle()
  {
    this.Menuwidth = !this.Menuwidth;
  }
  OpenDialog(myDialog: TemplateRef<any>)
  {
    this._dialog.open(myDialog,{autoFocus: false});
  }
  CreateDuan(item)
  {
    console.log(item.value);
    this.ThisDuan = { "Tieude": item.value,"idTao": this.CUser.id,"Thamgia": [this.CUser.id],"Trangthai":0 };
    this._congviecService.CreateDuans(this.ThisDuan).subscribe();
    this._dialog.closeAll();
  }
  ChosenDuan(item)
  {
    this.ThisDuan = item;
    console.log(item);
  }
  UpdateDuan(item, type, value) {          
    item[type] = value;
    this._congviecService.UpdateDuans(item, item.id).subscribe();
    this._notifierService.notify('success', 'Cập Nhật Thành Công');
  }
  DeleteDuan(item) {   
    const confirmation = this._fuseConfirmationService.open({
      title: 'Xóa Dự Án',
      message: 'Bạn Có Chắc Chắn Xóa Dự Án Này',
      actions: {
          confirm: {
              label: 'Xóa'
          }
      }
  });
  confirmation.afterClosed().subscribe((result) => {
      if (result === 'confirmed') {
          this._congviecService.DeleteDuans(item.id).subscribe();
          this._notifierService.notify('success', 'Xóa Thành Công');
      }
  });   
  }

  toggleOverlay(trigger: any,item,type) {  
    this.triggerOrigin = trigger;
    this.triggerType[type] = !this.triggerType[type]
    this.filteredNhanviens = this.Nhanviens;    
  }
  filterVitri(event): void
  {
      const value = event.target.value.toLowerCase();
      this.filteredNhanviens = this.Nhanviens.filter(v => v.name.toLowerCase().includes(value));
  }
 AddValue(item,type,value) {
    item[type].push(value);
    this._congviecService.UpdateDuans(item,item.id).subscribe();
    this._changeDetectorRef.markForCheck();
    this.triggerType[type] = false;
}
RemoveValue(item,type,value) {
  const confirmation = this._fuseConfirmationService.open({
    title: 'Xóa Dự Án',
    message: 'Bạn Có Chắc Chắn Xóa',
    actions: {
        confirm: {
            label: 'Xóa'
        }
    }
});
confirmation.afterClosed().subscribe((result) => {
    if (result === 'confirmed') {
      item[type] = item[type].filter(v=>v!=value);
      this._congviecService.UpdateDuans(item,item.id).subscribe();
      this._changeDetectorRef.markForCheck();
      this.triggerType[type] = false;
        this._notifierService.notify('success', 'Xóa Thành Công');
    }
}); 
}
AllThamgia()
{
  this.Nhanviens.forEach(v => {
    this.ThisDuan.Thamgia.push(v.id);
  });
  this._congviecService.UpdateDuans(this.ThisDuan,this.ThisDuan.id).subscribe();
  this.triggerType['Thamgia'] = false;
  this._changeDetectorRef.markForCheck();
}
ClearThamgia()
{
  this.ThisDuan.Thamgia = [this.CUser.id];
  this._congviecService.UpdateDuans(this.ThisDuan,this.ThisDuan.id).subscribe();
  this.triggerType['Thamgia'] = false;
  this._changeDetectorRef.markForCheck();
}


cardDropped(event: CdkDragDrop<any[]>, list): void {
  console.log(event.container.data);
  if (event.previousContainer === event.container) {
      console.log('true');
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

  }
  else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      event.container.data[event.currentIndex].Trangthai = event.container.id;
      const item = event.container.data[event.currentIndex]
      console.log(item);
        this._congviecService.UpdateTasks(item, item.id).subscribe();

  }

}

  ngOnDestroy(): void
  {
      this._unsubscribeAll.next(null);
      this._unsubscribeAll.complete();
  } 
}
