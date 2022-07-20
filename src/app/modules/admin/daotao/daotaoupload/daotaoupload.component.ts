import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { UserService } from 'app/core/user/user.service';
import { SharedService } from 'app/shared/shared.service';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-daotaoupload',
  templateUrl: './daotaoupload.component.html',
  styleUrls: ['./daotaoupload.component.scss']
})
export class DaotaouploadComponent implements OnInit {
  CUser: any;
  constructor(
    private _sharedService: SharedService,
    private _httpClient: HttpClient,
    private _userService: UserService,
  ) { 
    this._userService.user$.subscribe((data) => {
      this.CUser = data;    
    });
  }
  @Input() idTailieu: any;
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  percentDone: any;
  uploadSuccess: boolean = false;
  uploadFiles: [];
  files: File[] = [];
  ngOnInit(): void {
    this.LoadTailieu();
  }
  
  LoadTailieu()
  {    
    this._sharedService.uploads$.subscribe((data) => {     
    console.log(data);
    data.forEach(v => {
      v.path = `${environment.ApiURL}/upload/path/${v.Lienket}`;     
    });
    this.files = data.filter(v=>v.uuid == this.idTailieu);
  }
  )

  }
  onSelect(event) {
    event.addedFiles.forEach((v,k) => {
      setTimeout(() => {
        this.uploadAndProgress(v)
      }, k*100);
    });
  }
  onRemove(item) {
    this._sharedService.deletePath(item.Lienket).subscribe();
    this._sharedService.DeleteUpload(item.id).subscribe();
  }
  uploadAndProgress(file) {
    var formData = new FormData();
    formData.append('file', file)    
    this._sharedService.UploadFile(formData,this.CUser,this.idTailieu);
    // this._httpClient.post(`${environment.ApiURL}/upload/file`, formData, { reportProgress: true, observe: 'events' })
    //   .subscribe(event => {
    //     if (event.type === HttpEventType.UploadProgress) {
    //       this.percentDone = Math.round(100 * event.loaded / event.total);
    //     } else if (event instanceof HttpResponse) {
    //       this.uploadSuccess = true;
    //       const upload = {idTao:this.CUser.id, uuid: this.idTailieu, Tieude: event.body['originalname'], Lienket: event.body['filename'], Exten:event.body['originalname'].split('.').pop()};
    //       this._sharedService.CreateUpload(upload).subscribe();
    //     }
    //   })
  }
}
