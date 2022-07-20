import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CauhinhService } from 'app/modules/admin/cauhinh/cauhinh.service';
import { take } from 'rxjs';
import { TailienguonService } from '../tailienguon.service';

@Component({
    selector: 'app-folder-list',
    templateUrl: './folder-list.component.html',
    styleUrls: ['./folder-list.component.scss'],
})
export class FolderListComponent implements OnInit {
    isFolder = false;
    isFile = false;
    danhmucList: any[] = [];
    danhmucDetail;
    tailieunguonList: any[] = [];

    title = 'Tất cả các Folder và File';
    type = 'PieChart';
    data = [
        ['Sửa lại', 45.0],
        ['Phê duyệt', 45],
        ['Chưa xem', 10],
    ];
    columnNames = ['Browser', 'Percentage'];
    options = {};
    width = 400;
    height = 300;

    constructor(
        private _tailieunguonService: TailienguonService,
        private _cauhinhService: CauhinhService,
        private _route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this._route.params.subscribe((item) => {
            if (item.id) {
                this._cauhinhService.getAllDanhmuc().subscribe();

                this._cauhinhService.danhmucs$
                    .pipe(take(1))
                    .subscribe((res) => {
                        if (res && item.id) {
                            this.danhmucList = res.filter(
                                (x) => x.pid == item.id
                            );
                        }
                    });
                this._cauhinhService.selectDanhmuc(item.id).subscribe();
                this._cauhinhService.danhmuc$.pipe(take(1)).subscribe((res) => {
                    if (res) {
                        this.danhmucDetail = res;
                        this.danhmucList.push(this.danhmucDetail);
                    }
                });

                this._tailieunguonService.tailieunguons$.subscribe((res) => {
                    if (res && item.id) {
                        this.tailieunguonList = res.filter(
                            (x) => x.idDM == item.id
                        );
                    }
                });
            }
        });
    }
}
