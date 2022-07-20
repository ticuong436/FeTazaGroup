import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { CauhinhService } from 'app/modules/admin/cauhinh/cauhinh.service';
import { TailienguonService } from '../tailienguon.service';
@Component({
    selector: 'app-tailieunguon-list',
    templateUrl: './tailieunguon-list.component.html',
    styleUrls: ['./tailieunguon-list.component.scss'],
})
export class TailieunguonListComponent implements OnInit {
    title = 'Tất cả các Folder và File';
    type = 'PieChart';
    data = [
        ['Sửa lại', 45.0],
        ['Phê duyệt', 45],
        ['Chưa xem', 10],
    ];
    columnNames = ['Browser', 'Percentage'];
    options = {};
    width = 550;
    height = 400;
    folderList: any[];
    fileList: any[];
    constructor(private _tailieunguonService: TailienguonService, private _cauhinhService: CauhinhService) {}
    ngOnInit() {
        this._cauhinhService.danhmucs$.subscribe((result) => {
            this.folderList = result
        })

        this._tailieunguonService.tailieunguons$.subscribe((data) => {
            if (data) {
                this.fileList = data

            }
        });
    }
}
