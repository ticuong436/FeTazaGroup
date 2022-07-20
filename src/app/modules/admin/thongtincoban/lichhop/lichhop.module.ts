import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeVi from '@angular/common/locales/vi';
import { LichhopComponent } from './lichhop.component';
import { RouterModule, Routes } from '@angular/router';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MaterialExampleModule } from 'material.module';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { LichhopDetailResolver, LichhopResolver } from './lichhop.resolver';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FuseScrollbarModule } from '@fuse/directives/scrollbar';
import { TimkiemModule } from 'app/pipes/timkiem/timkiem.module';
import { FindbyidPipe } from 'app/pipes/findbyid/findbyid.pipe';
import { FindbyidModule } from 'app/pipes/findbyid/findbyid.module';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgxDropzoneModule } from 'ngx-dropzone';
registerLocaleData(localeVi);
const LichhopRoutes: Routes = [
  {
      path  : '',
      component: LichhopComponent,           
      resolve  : {
        tasks    : LichhopResolver,
    },
    children : [
      {
          path         : ':id',
          component: LichhopComponent,  
          resolve      : {
             task     : LichhopDetailResolver,
          },
      }
  ]
  }
];

@NgModule({
  declarations: [
    LichhopComponent
  ],
  imports: [
    NgxDropzoneModule,
    TooltipModule,
    FindbyidModule,
    TimkiemModule,
    FuseScrollbarModule,
    CKEditorModule,
    MatDatepickerModule,
    MatInputModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgxMatNativeDateModule,
    FuseDrawerModule,
    MaterialExampleModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    RouterModule.forChild(LichhopRoutes),
    CommonModule,
  ]
})
export class LichhopModule { }
