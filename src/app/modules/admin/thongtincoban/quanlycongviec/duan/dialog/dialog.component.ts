import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuanlycongviecService } from '../../quanlycongviec.service';
import Editor from 'ckeditor5/build/ckEditor';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  Duan:any
  public Editor = Editor ;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _quanlycongviecService: QuanlycongviecService,
  ) { }
  ngOnInit(): void {
    this.Duan = {
      Tieude  : '',
      Mota    : '',
      idTao :this.data.idTao
  };
  }
  CreateDuan(Duan): void
  {
      this._quanlycongviecService.CreateDuans(Duan).subscribe();
  }
  UpdateDuan(Duan): void
  {
      this._quanlycongviecService.UpdateDuans(Duan,Duan.id).subscribe();
  }
}
