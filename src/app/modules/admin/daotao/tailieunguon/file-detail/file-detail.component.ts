import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { UserService } from 'app/core/user/user.service';
import { NhanvienService } from 'app/modules/admin/baocao/nhanvien/nhanvien.service';
import { CauhinhService } from 'app/modules/admin/cauhinh/cauhinh.service';
import { SharedService } from 'app/shared/shared.service';
import { Subject, take, takeUntil } from 'rxjs';
import { FileUpload } from '../../models/file-upload.model';
import { MyUploadAdapter } from '../../MyUploadAdapter';
import { FileUploadService } from '../../services/file-upload.service';
import ClassicEditor from 'ckeditor5/build/ckEditor';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { environment } from 'environments/environment';
import { clone } from 'lodash';
import { TailienguonService } from '../tailienguon.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-file-detail',
    templateUrl: './file-detail.component.html',
    styleUrls: ['./file-detail.component.scss'],
})
export class FileDetailComponent implements OnInit {
    selectedFiles?: FileList;
    currentFileUpload?: FileUpload;
    percentage = 0;
    folderList: FormGroup;
    fileList: FormGroup;
    dataList: FormGroup;
    files: any;
    filedetail: any;
    filesTailieu: any;
    isFile = true;
    isFolder = true;
    public Tailieu = {
        Noidung: '',
        Ghichu: '',
    };
    public Editor = ClassicEditor;
    public onReady(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new MyUploadAdapter(
                loader,
                this._uploadService,
                this._sharedService
            );
        };
        editor.ui
            .getEditableElement()
            .parentElement.insertBefore(
                editor.ui.view.toolbar.element,
                editor.ui.getEditableElement()
            );
    }
    public config = {
        htmlSupport: {
            allow: [
                {
                    name: /.*/,
                    attributes: true,
                    classes: true,
                },
            ],
        },
    };
    showFiller = true;
    deleteFile = false;
    Danhmuc: any;
    Tailieunguon: any;
    Tree: any;
    CurrentTailieu: any;
    triggerOrigin: any;
    CUser: any;
    isOpenTacgia = false;
    isOpenPheduyet = false;
    filterNhanviens: any[] = [];
    Nhanviens: any[] = [];
    filteredTacgia: any[] = [];
    filteredKiemduyet: any[] = [];
    private _unsubscribeAll: Subject<any> = new Subject();

    constructor(
        private _tailieunguonService: TailienguonService,
        private fb: FormBuilder,
        private _uploadService: FileUploadService,
        private _cauhinhService: CauhinhService,
        private _userService: UserService,
        private _nhanvienService: NhanvienService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _notifierService: NotifierService,
        private _sharedService: SharedService,
        private _route: ActivatedRoute
    ) {
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {
                this.CUser = data;
                this._changeDetectorRef.markForCheck();
            });
    }

    ngOnInit(): void {
        this._route.params.subscribe((item) => {
            if (item.id) {
                this._tailieunguonService
                    .selectTailieunguon(item.id)
                    .subscribe();
                this._tailieunguonService.tailieunguon$
                    .pipe(take(1))
                    .subscribe((res) => {
                        if (res) {
                            console.log(res);
                            this.CurrentTailieu = res;
                            console.log(this.CurrentTailieu);
                        }
                    });
                this._nhanvienService.nhanviens$
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe((data) => {
                        this.Nhanviens =
                            this.filterNhanviens =
                            this.filteredTacgia =
                            this.filteredKiemduyet =
                                data;
                        this._changeDetectorRef.markForCheck();
                    });
            }
        });
    }
    getFileDetail(data) {}
    getFolderDetail(data) {
        this.isFile = false;
        this.isFolder = true;
    }

    ChangeValue(field, value) {
        this.CurrentTailieu[field] = value;
    }
    ChangeEditorValue(field, { editor }: ChangeEvent) {
        if (editor.getData() != undefined) {
            this.CurrentTailieu[field] = editor.getData();
        }
    }
    toggleTacgia(trigger: any) {
        this.triggerOrigin = trigger;
        this.isOpenTacgia = !this.isOpenTacgia;
    }
    togglePheduyet(trigger: any) {
        this.triggerOrigin = trigger;
        this.isOpenPheduyet = !this.isOpenPheduyet;
    }
    filterTacgia(event): void {
        const value = event.target.value.toLowerCase();
        this.filteredTacgia = this.Nhanviens.filter((v) =>
            v.name.toLowerCase().includes(value)
        );
    }
    filterKiemduyet(event): void {
        const value = event.target.value.toLowerCase();
        this.filteredKiemduyet = this.Nhanviens.filter((v) =>
            v.name.toLowerCase().includes(value)
        );
    }

    CreateTailieunguon(node) {
        const tailieunguon = {
            Tieude: 'Tài Liệu Mới',
            idDM: node.id,
            idTao: this.CUser.id,
        };
        this._tailieunguonService
            .CreateTailieunguon(tailieunguon)
            .subscribe((data) => {
                this._notifierService.notify('success', 'Tạo Mới Thành Công');

                let x = this.files.find((v) => v.id == node.pid);
                while (x) {
                    x = this.files.find((v) => v.id == x.pid);
                }
            });
    }
    UpdateTailieu() {
        console.log(this.CurrentTailieu);
        this._tailieunguonService
            .UpdateTailieunguon(this.CurrentTailieu)
            .subscribe();
        this._notifierService.notify('success', 'Cập Nhật Thành Công');
    }
    ChonTacgia(id) {
        this.CurrentTailieu.Tacgia.push(id);
        this._tailieunguonService
            .UpdateTailieunguon(this.CurrentTailieu)
            .subscribe();
        this.isOpenTacgia = false;
        this.filteredTacgia = this.Nhanviens;
    }
    ChonKiemduyet(id) {
        this.CurrentTailieu.Kiemduyet.push(id);
        this._tailieunguonService
            .UpdateTailieunguon(this.CurrentTailieu)
            .subscribe();
        this.isOpenPheduyet = false;
        this.filteredKiemduyet = this.Nhanviens;
    }
    RemoveMang(type, value) {
        this.CurrentTailieu[type] = this.CurrentTailieu[type].filter(
            (v) => v != value
        );
        this._tailieunguonService
            .UpdateTailieunguon(this.CurrentTailieu)
            .subscribe();
        //this.ngOnInit();
    }
    deleteFileDetail() {
        console.log(this.CurrentTailieu);
        this._tailieunguonService
            .DeleteTailieunguon(this.CurrentTailieu.id)
            .subscribe((data) => {
                this.CurrentTailieu = {};
            });
        this._notifierService.notify('success', 'Xóa Thành Công');
    }
    selectFile(event: any): void {
        this.selectedFiles = event.target.files;
    }
    nest = (items, id = '0', link = 'pid') =>
        items
            .filter((item) => item[link] == id)
            .map((item) => ({
                ...item,
                children: this.nest(items, item.id),
            }));

    // this.Tailieunguon.forEach(v => {
    //         v.Type= 'file';
    //         v.pid = v.idDM
    //         this.Tree.push(v);
    // });
    // this._tree.next(this.Tree);
    // console.log(this.Danhmuc);
    // this.dataSource.data = this.nest(this._tree.value);
    // console.log(this.dataSource.data);

    LoadTailieu(idTL) {
        this._sharedService.uploads$.subscribe((data) => {
            console.log(data);
            data.forEach((v) => {
                v.path = `${environment.ApiURL}/upload/path/${v.Lienket}`;
            });
            this.filesTailieu = data.filter(
                (v) => v.uuid == this.CurrentTailieu.id
            );
        });
    }
    onSelect(event) {
        event.addedFiles.forEach((v, k) => {
            setTimeout(() => {
                this.uploadAndProgress(v);
            }, k * 100);
        });
    }
    onRemove(item) {
        this._sharedService.deletePath(item.Lienket).subscribe();
        this._sharedService.DeleteUpload(item.id).subscribe();
    }
    uploadAndProgress(file) {
        var formData = new FormData();
        formData.append('file', file);
        this._sharedService.UploadFile(
            formData,
            this.CUser,
            this.CurrentTailieu.id
        );
    }
}
