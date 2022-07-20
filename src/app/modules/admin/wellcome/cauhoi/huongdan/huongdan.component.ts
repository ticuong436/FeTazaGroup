import { Component, OnInit } from '@angular/core';
import { HelpCenterService } from 'app/modules/admin/apps/help-center/help-center.service';
import { GuideCategory } from 'app/modules/admin/apps/help-center/help-center.type';
import { Subject, takeUntil } from 'rxjs';
import { CauhoiService } from '../cauhoi.service';

@Component({
  selector: 'app-huongdan',
  templateUrl: './huongdan.component.html',
  styleUrls: ['./huongdan.component.scss']
})
export class HuongdanComponent implements OnInit {
  cauhois:any;
  guideCategories: GuideCategory[];
  private _unsubscribeAll: Subject<any> = new Subject();

  /**
   * Constructor
   */
  constructor(private _helpCenterService: HelpCenterService,
    private _cauhoiService: CauhoiService,)
  {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void
  {
      // Get the Guide categories
      this._helpCenterService.guides$
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((guideCategories) => {
              this.guideCategories = guideCategories;
          });

    this._cauhoiService.hotros$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((cauhois) => {
        this.cauhois = cauhois;
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void
  {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next(null);
      this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any
  {
      return item.id || index;
  }

}
