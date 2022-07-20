import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'app/shared/shared.module';
import { CauhoiComponent } from './cauhoi.component'; 
import { cauhoiRoutes } from './cauhoi.routing';
import { MaterialExampleModule } from 'material.module';
import { FaqComponent } from './faq/faq.component';
import { HuongdanComponent } from './huongdan/huongdan.component';
import { HotroComponent } from './hotro/hotro.component';
import { CauhoiadminComponent } from './cauhoiadmin/cauhoiadmin.component';
import { FindbyidModule } from 'app/pipes/findbyid/findbyid.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TooltipModule } from 'ng2-tooltip-directive';

import { AdminComponent } from './huongdan/admin/admin.component';
import { CauhoidetailComponent } from './cauhoidetail/cauhoidetail.component';
@NgModule({
    declarations: [
        CauhoiComponent,
        FaqComponent,
        HuongdanComponent,
        HotroComponent,
        CauhoiadminComponent,
        AdminComponent,
        CauhoidetailComponent
    ],
    imports     : [
        TooltipModule,
        CKEditorModule,
        FindbyidModule,
        MaterialExampleModule,
        RouterModule.forChild(cauhoiRoutes),
        MatButtonModule,
        MatButtonToggleModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatSortModule,
        MatTableModule,
        MatTooltipModule,
        NgApexchartsModule,
        SharedModule,
    ]
})
export class CauhoiModule
{
}
