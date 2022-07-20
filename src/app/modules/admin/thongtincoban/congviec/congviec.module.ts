import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CongviecComponent } from './congviec.component';
import { Route, RouterModule } from '@angular/router';
import { CongviecboardComponent } from './congviecboard/congviecboard.component';
import { MaterialExampleModule } from 'material.module';
import { AddcardComponent } from './congviecboard/addcard/addcard.component';
import { AddlistComponent } from './congviecboard/addlist/addlist.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SharedModule } from 'app/shared/shared.module';
import { QuanlycongviecComponent } from '../quanlycongviec/quanlycongviec.component';
import { CongvecsDuanResolver, CongvecsEdittaskResolver, CongviecResolver } from './congviec.resolver';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FuseCardModule } from '@fuse/components/card';
import { FuseMasonryModule } from '@fuse/components/masonry';
import { GoogleChartsModule } from 'angular-google-charts';
import { CustomModule } from 'app/pipes/custom/custom.module';
import { FindbyidModule } from 'app/pipes/findbyid/findbyid.module';
import { TimkiemModule } from 'app/pipes/timkiem/timkiem.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { EdittaskComponent } from './edittask/edittask.component';
import { ChitiettaskComponent } from './chitiettask/chitiettask.component';
import { DashboardcongviecComponent } from './dashboardcongviec/dashboardcongviec.component';
import { TimelineComponent } from './timeline/timeline.component';
export const congviecRoutes: Route[] = [
  {
      path     : '',
      component: CongviecComponent,
      resolve  : {
          boards: CongviecResolver
      },
      children:[
        {
          
          path     : ':id',
          component: CongviecboardComponent,
          resolve  : {
              board: CongvecsDuanResolver
          },
          children : [
              {
                  path     : ':id',
                  component: EdittaskComponent,
                  resolve  : {
                      card: CongvecsEdittaskResolver
                  }
              }
          ]
      },
        // {
        // path     : 'luutru',
        // component: ChitiettaskComponent,
        // }
      ]

  },
];

@NgModule({
  declarations: [
    CongviecComponent,
    CongviecboardComponent,
    AddcardComponent,
    AddlistComponent,
    EdittaskComponent,
    ChitiettaskComponent,
    DashboardcongviecComponent,
    TimelineComponent,
  ],
  imports: [
    NgApexchartsModule,
    NgxDropzoneModule,
    GoogleChartsModule,
    CKEditorModule,
    FindbyidModule,
    TimkiemModule,
    CustomModule,
    FuseCardModule,
    MaterialExampleModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatSidenavModule,
    FuseMasonryModule,
    SharedModule,
    MaterialExampleModule,
    CommonModule,
    RouterModule.forChild(congviecRoutes),
    SharedModule,
    CKEditorModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class CongviecModule { }
