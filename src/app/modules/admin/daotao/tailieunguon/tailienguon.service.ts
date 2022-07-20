import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { CauhinhService } from '../../cauhinh/cauhinh.service';
import { Files } from './tailieunguon.types';
@Injectable({
  providedIn: 'root'
})
export class TailienguonService {
  //private urlApi = 'http://localhost:3000/tailieu';
  private _tailieunguons: BehaviorSubject<any[] | null> = new BehaviorSubject(null);
  private _tailieunguon: BehaviorSubject<any> = new BehaviorSubject(null);
  private _tree: BehaviorSubject<any> = new BehaviorSubject(null);
  private _files: BehaviorSubject<any[] | null> = new BehaviorSubject(null);
  private _file: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(
      private http: HttpClient,
      private _cauhinhService: CauhinhService
      ) {}

  get tailieunguons$(): Observable<any[]> {
      return this._tailieunguons.asObservable();
  } 
  get tailieunguon$(): Observable<any> {
      return this._tailieunguon.asObservable();
  }
  get tree$(): Observable<any> {
      return this._tree.asObservable();
  } 
  get files$(): Observable<any[]> {
      return this._files.asObservable();
  } 
  get file$(): Observable<any> {
      return this._file.asObservable();
  }
  
//   getTree()
//   {
//     const Danhmuc = this._cauhinhService.danhmuc$.
//     this.Tailieunguon.forEach(v => {
//         v.Type= 'file';
//         v.pid = v.idDM
//         this.Tree.push(v);
// });
//   }
  getAllTailieunguon(): Observable<any> {
      return this.http.get(`${environment.ApiURL}/tailieunguon`).pipe(
          tap((res) => {            
              this._tailieunguons.next(res);
          })
      );
  }
  selectTailieunguon(id:string): Observable<any>
{
   return this._tailieunguons.pipe(
       take(1),
       map((tailieunguons) => {
           const tailieunguon = tailieunguons.find(item => item.id === id) || null;
           this._tailieunguon.next(tailieunguon);
           return tailieunguon;
       }),
       switchMap((tailieunguon) => {
           if ( !tailieunguon )
           {
               return throwError('Could not found product with id of ' + id + '!');
           }
           return of(tailieunguon);
       })
   );
}
  CreateTailieunguon(data) {
      return this.tailieunguons$.pipe(
          take(1),
          switchMap((tailieunguons) =>
              this.http.post(`${environment.ApiURL}/tailieunguon`, data).pipe(
                  map((res) => {
                      this._tailieunguons.next([res, ...tailieunguons]);
                      return res;
                  })
              )
          )
      );
  }
 UpdateTailieunguon(data) {
      return this.tailieunguons$.pipe(
          take(1),
          switchMap((tailieunguons) =>
              this.http.patch(`${environment.ApiURL}/tailieunguon/${data.id}`, data).pipe(
                  map((res) => {
                      const index = tailieunguons.findIndex(item => item.id === data.id);
                      tailieunguons[index] = data;
                      console.log(res);
                     // this._tailieunguons.next(tailieunguons);
                      return res;
                  })
              )
          )
      );
  }
  DeleteTailieunguon(id): Observable<any> {
    return this.tailieunguons$.pipe(
        take(1),
        switchMap(tailieunguons => this.http.delete(`${environment.ApiURL}/tailieunguon/${id}`).pipe(
            map((isDeleted: boolean) => {
                const index = tailieunguons.findIndex(item => item.id === id);
                tailieunguons.splice(index, 1);
                this._tailieunguons.next(tailieunguons);
                return isDeleted;
            })
        ))
    );
  }
// updateFile(data) {
//     return this.files$.pipe(
//         take(1),
//         switchMap((files) =>
//             this.http.patch(this.urlApi + `/${data.id}`, data).pipe(
//                 map((updateCourse) => {
//                     // Find the index of the updated tag
//                     const index = files.findIndex(
//                         (item) => item.id === item.id
//                     );

//                     // Update the tag
//                     files[index] = data;
//                     console.log(updateCourse);

//                     // Update the tags
//                     this._files.next(files);

//                     // Return the updated tag
//                     return updateCourse;
//                 })
//             )
//         )
//     );
// }
//   getFileDetail(id){
//       return this.http.get(this.urlApi + `/${id}`).pipe(
//           tap((res) => {
//               this._file.next(res)
//               return res;
//           })
//       );
//   }
//   updateFileDetail(file){        
//       return this.http.patch(this.urlApi + `/${file.id}`,file).pipe(
//           tap((res)=>{
              
//               this._file.next(res)
//               return res;
//           })
//       )
//   }
//   deleteFileDetail(id){
//       return this.files$.pipe(
//           take(1),
//           switchMap(files=>this.http.delete(this.urlApi + `/${id}`).pipe(map((isDelete => {
            
//            const updateFile =  files.filter(e => e.id != id);
            
//             this._files.next(updateFile)
//             return isDelete
    
//           }))))
//         )
//   }
  getFile(){
      return this.files$.pipe()
  }
//   getfile(id){
//       return this.files$.pipe(
//           take(1),
//           switchMap(files=>this.http.delete(this.urlApi + `/${id}`).pipe(map((isDelete => {
            
//            const updateFile =  files.filter(e => e.id != id);
            
//             this._files.next(updateFile)
//             return isDelete
    
//           }))))
//         )
//   }
}
