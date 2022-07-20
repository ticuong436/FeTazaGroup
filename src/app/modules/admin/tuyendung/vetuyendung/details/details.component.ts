import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { clone, cloneDeep } from 'lodash';
import { Subject, takeUntil } from 'rxjs';
import { ListComponent } from '../list/list.component';
import { VetuyendungService } from '../vetuyendung.service';
import { Vetuyendung } from '../vetuyendung.types';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent implements OnInit {

  @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;
  @ViewChild('tagsPanel') private _tagsPanel: TemplateRef<any>;
  @ViewChild('tagsPanelOrigin') private _tagsPanelOrigin: ElementRef;

  editMode: boolean = false;
  vetuyendung: Vetuyendung;
  vetuyendungForm: FormGroup;
  vetuyendungs: Vetuyendung[];
  Vitri:any;
  private _tagsPanelOverlayRef: OverlayRef;
  private _unsubscribeAll: Subject<any> = new Subject<any>();


  constructor(
    private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _ListComponent: ListComponent,
    private _vetuyendungService: VetuyendungService,
    private _formBuilder: FormBuilder,
    private _fuseConfirmationService: FuseConfirmationService,
    private _renderer2: Renderer2,
    private _router: Router,
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {

    this._ListComponent.matDrawer.open();
       // Create the vetuyendung form
    this.vetuyendungForm = this._formBuilder.group({
        id          : [''],
        idVitri        : ['', [Validators.required]],
        TGThuviec        : [''],
        SLHT        : [''],
        SLCT        : [''],
        LuongDK        : [''],
        TNNS        : [{}],
        Mota        : [''],
        Lydo        : [''],
        Yeucau        : [''],
        Pheduyet        : [{}],
        Trangthai        : [''],
        published        : [''],
        ordering        : [''],
        Ngaytao        : [''],
        idTao        : [''],
    });
    this.Vitri = {"eceb6560-47b2-480f-b876-857e48f7d723":"CEO","4aebb23f-0009-4765-8616-2ec0bc3bf721":"Front End","d9dfcd17-3bdb-4ef7-9675-336e33d0592b":"SEO","30941412-66c5-4676-8862-7de27aa86c85":"Leader IT"};
    this._vetuyendungService.vetuyendungs$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((vetuyendungs: Vetuyendung[]) => {
           this.vetuyendungs = vetuyendungs;
            this._changeDetectorRef.markForCheck();
        });

    this._vetuyendungService.vetuyendung$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((vetuyendung: Vetuyendung) => {
            this._ListComponent.matDrawer.open();
            this.vetuyendung = vetuyendung;
            // // Clear the emails and phoneNumbers form arrays
            // (this.contactForm.get('emails') as FormArray).clear();
            // (this.contactForm.get('phoneNumbers') as FormArray).clear();

            this.vetuyendungForm.patchValue(vetuyendung);

            // // Setup the emails form array
            // const emailFormGroups = [];

            // if ( contact.emails.length > 0 )
            // {
            //     // Iterate through them
            //     contact.emails.forEach((email) => {

            //         // Create an email form group
            //         emailFormGroups.push(
            //             this._formBuilder.group({
            //                 email: [email.email],
            //                 label: [email.label]
            //             })
            //         );
            //     });
            // }
            // else
            // {
            //     // Create an email form group
            //     emailFormGroups.push(
            //         this._formBuilder.group({
            //             email: [''],
            //             label: ['']
            //         })
            //     );
            // }

            // // Add the email form groups to the emails form array
            // emailFormGroups.forEach((emailFormGroup) => {
            //     (this.contactForm.get('emails') as FormArray).push(emailFormGroup);
            // });

            // // Setup the phone numbers form array
            // const phoneNumbersFormGroups = [];

            // if ( contact.phoneNumbers.length > 0 )
            // {
            //     // Iterate through them
            //     contact.phoneNumbers.forEach((phoneNumber) => {

            //         // Create an email form group
            //         phoneNumbersFormGroups.push(
            //             this._formBuilder.group({
            //                 country    : [phoneNumber.country],
            //                 phoneNumber: [phoneNumber.phoneNumber],
            //                 label      : [phoneNumber.label]
            //             })
            //         );
            //     });
            // }
            // else
            // {
            //     // Create a phone number form group
            //     phoneNumbersFormGroups.push(
            //         this._formBuilder.group({
            //             country    : ['us'],
            //             phoneNumber: [''],
            //             label      : ['']
            //         })
            //     );
            // }

            // // Add the phone numbers form groups to the phone numbers form array
            // phoneNumbersFormGroups.forEach((phoneNumbersFormGroup) => {
            //     (this.contactForm.get('phoneNumbers') as FormArray).push(phoneNumbersFormGroup);
            // });

            // Toggle the edit mode off
            this.toggleEditMode(false);

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });

    // // Get the country telephone codes
    // this._vetuyendungService.countries$
    //     .pipe(takeUntil(this._unsubscribeAll))
    //     .subscribe((codes: Country[]) => {
    //         this.countries = codes;

    //         // Mark for check
    //         this._changeDetectorRef.markForCheck();
    //     });

    // // Get the tags
    // this._contactsService.tags$
    //     .pipe(takeUntil(this._unsubscribeAll))
    //     .subscribe((tags: Tag[]) => {
    //         this.tags = tags;
    //         this.filteredTags = tags;

    //         // Mark for check
    //         this._changeDetectorRef.markForCheck();
    //     });
}

/**
 * On destroy
 */
ngOnDestroy(): void
{
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();

    // // Dispose the overlays if they are still on the DOM
    // if ( this._tagsPanelOverlayRef )
    // {
    //     this._tagsPanelOverlayRef.dispose();
    // }
}

// -----------------------------------------------------------------------------------------------------
// @ Public methods
// -----------------------------------------------------------------------------------------------------

closeDrawer(): Promise<MatDrawerToggleResult>
{
    return this._ListComponent.matDrawer.close();
}
toggleEditMode(editMode: boolean | null = null): void
{
    if ( editMode === null )
    {
        this.editMode = !this.editMode;
    }
    else
    {
        this.editMode = editMode;
    }
    this._changeDetectorRef.markForCheck();
}
updateVetuyendung(): void
{
    const vetuyendung = this.vetuyendungForm.getRawValue();
    this._vetuyendungService.updateVetuyendung(vetuyendung.id, vetuyendung).subscribe(() => {
        // Toggle the edit mode off
        this.toggleEditMode(false);
    });
}

deleteVetuyendung(): void
{
    // Open the confirmation dialog
    const confirmation = this._fuseConfirmationService.open({
        title  : 'Xóa Phiếu Yêu Cầu',
        message: 'Bạn Có Chắc Chắn Muốn Xóa Phiếu Yêu Cầu Này Không?',
        actions: {
            confirm: {
                label: 'Xóa'
            }
        }
    });
    confirmation.afterClosed().subscribe((result) => {
        if ( result === 'confirmed' )
        {
            const id = this.vetuyendung.id;
            const currentVetuyendungIndex = this.vetuyendungs.findIndex(item => item.id === id);
            const nextVetuyendungIndex = currentVetuyendungIndex + ((currentVetuyendungIndex === (this.vetuyendungs.length - 1)) ? -1 : 1);
            const nextVetuyendungId = (this.vetuyendungs.length === 1 && this.vetuyendungs[0].id === id) ? null : this.vetuyendungs[nextVetuyendungIndex].id;
            this._vetuyendungService.deleteVetuyendung(id)
                .subscribe((isDeleted) => {
                    if ( !isDeleted )
                    {
                        return;
                    }
                    if ( nextVetuyendungId )
                    {
                        this._router.navigate(['../', nextVetuyendungId], {relativeTo: this._activatedRoute});
                    }
                    else
                    {
                        this._router.navigate(['../'], {relativeTo: this._activatedRoute});
                    }
                    this.toggleEditMode(false);
                });
            this._changeDetectorRef.markForCheck();
        }
    });

}

// uploadAvatar(fileList: FileList): void
// {
//     // Return if canceled
//     if ( !fileList.length )
//     {
//         return;
//     }

//     const allowedTypes = ['image/jpeg', 'image/png'];
//     const file = fileList[0];

//     // Return if the file is not allowed
//     if ( !allowedTypes.includes(file.type) )
//     {
//         return;
//     }

//     // Upload the avatar
//     this._contactsService.uploadAvatar(this.contact.id, file).subscribe();
// }

// removeAvatar(): void
// {
//     const avatarFormControl = this.contactForm.get('avatar');
//     avatarFormControl.setValue(null);
//     this._avatarFileInput.nativeElement.value = null;
//     this.contact.avatar = null;
// }
// openTagsPanel(): void
// {
//     // Create the overlay
//     this._tagsPanelOverlayRef = this._overlay.create({
//         backdropClass   : '',
//         hasBackdrop     : true,
//         scrollStrategy  : this._overlay.scrollStrategies.block(),
//         positionStrategy: this._overlay.position()
//                               .flexibleConnectedTo(this._tagsPanelOrigin.nativeElement)
//                               .withFlexibleDimensions(true)
//                               .withViewportMargin(64)
//                               .withLockedPosition(true)
//                               .withPositions([
//                                   {
//                                       originX : 'start',
//                                       originY : 'bottom',
//                                       overlayX: 'start',
//                                       overlayY: 'top'
//                                   }
//                               ])
//     });

//     // Subscribe to the attachments observable
//     this._tagsPanelOverlayRef.attachments().subscribe(() => {

//         // Add a class to the origin
//         this._renderer2.addClass(this._tagsPanelOrigin.nativeElement, 'panel-opened');

//         // Focus to the search input once the overlay has been attached
//         this._tagsPanelOverlayRef.overlayElement.querySelector('input').focus();
//     });
//     const templatePortal = new TemplatePortal(this._tagsPanel, this._viewContainerRef);


//     this._tagsPanelOverlayRef.attach(templatePortal);

//     // Subscribe to the backdrop click
//     this._tagsPanelOverlayRef.backdropClick().subscribe(() => {

//         // Remove the class from the origin
//         this._renderer2.removeClass(this._tagsPanelOrigin.nativeElement, 'panel-opened');

//         // If overlay exists and attached...
//         if ( this._tagsPanelOverlayRef && this._tagsPanelOverlayRef.hasAttached() )
//         {
//             // Detach it
//             this._tagsPanelOverlayRef.detach();

//             // Reset the tag filter
//             this.filteredTags = this.tags;

//             // Toggle the edit mode off
//             this.tagsEditMode = false;
//         }

//         // If template portal exists and attached...
//         if ( templatePortal && templatePortal.isAttached )
//         {
//             // Detach it
//             templatePortal.detach();
//         }
//     });
// }

// toggleTagsEditMode(): void
// {
//     this.tagsEditMode = !this.tagsEditMode;
// }

// filterTags(event): void
// {
//     // Get the value
//     const value = event.target.value.toLowerCase();

//     // Filter the tags
//     this.filteredTags = this.tags.filter(tag => tag.title.toLowerCase().includes(value));
// }

// filterTagsInputKeyDown(event): void
// {
//     // Return if the pressed key is not 'Enter'
//     if ( event.key !== 'Enter' )
//     {
//         return;
//     }

//     // If there is no tag available...
//     if ( this.filteredTags.length === 0 )
//     {
//         // Create the tag
//         this.createTag(event.target.value);

//         // Clear the input
//         event.target.value = '';

//         // Return
//         return;
//     }

//     // If there is a tag...
//     const tag = this.filteredTags[0];
//     const isTagApplied = this.contact.tags.find(id => id === tag.id);

//     // If the found tag is already applied to the contact...
//     if ( isTagApplied )
//     {
//         // Remove the tag from the contact
//         this.removeTagFromContact(tag);
//     }
//     else
//     {
//         // Otherwise add the tag to the contact
//         this.addTagToContact(tag);
//     }
// }

// /**
//  * Create a new tag
//  *
//  * @param title
//  */
// createTag(title: string): void
// {
//     const tag = {
//         title
//     };

//     // Create tag on the server
//     this._contactsService.createTag(tag)
//         .subscribe((response) => {

//             // Add the tag to the contact
//             this.addTagToContact(response);
//         });
// }

// /**
//  * Update the tag title
//  *
//  * @param tag
//  * @param event
//  */
// updateTagTitle(tag: Tag, event): void
// {
//     // Update the title on the tag
//     tag.title = event.target.value;

//     // Update the tag on the server
//     this._contactsService.updateTag(tag.id, tag)
//         .pipe(debounceTime(300))
//         .subscribe();

//     // Mark for check
//     this._changeDetectorRef.markForCheck();
// }

// /**
//  * Delete the tag
//  *
//  * @param tag
//  */
// deleteTag(tag: Tag): void
// {
//     // Delete the tag from the server
//     this._contactsService.deleteTag(tag.id).subscribe();

//     // Mark for check
//     this._changeDetectorRef.markForCheck();
// }

// /**
//  * Add tag to the contact
//  *
//  * @param tag
//  */
// addTagToContact(tag: Tag): void
// {
//     // Add the tag
//     this.contact.tags.unshift(tag.id);

//     // Update the contact form
//     this.contactForm.get('tags').patchValue(this.contact.tags);

//     // Mark for check
//     this._changeDetectorRef.markForCheck();
// }

// /**
//  * Remove tag from the contact
//  *
//  * @param tag
//  */
// removeTagFromContact(tag: Tag): void
// {
//     // Remove the tag
//     this.contact.tags.splice(this.contact.tags.findIndex(item => item === tag.id), 1);

//     // Update the contact form
//     this.contactForm.get('tags').patchValue(this.contact.tags);

//     // Mark for check
//     this._changeDetectorRef.markForCheck();
// }

// /**
//  * Toggle contact tag
//  *
//  * @param tag
//  */
// toggleContactTag(tag: Tag): void
// {
//     if ( this.contact.tags.includes(tag.id) )
//     {
//         this.removeTagFromContact(tag);
//     }
//     else
//     {
//         this.addTagToContact(tag);
//     }
// }

// /**
//  * Should the create tag button be visible
//  *
//  * @param inputValue
//  */
// shouldShowCreateTagButton(inputValue: string): boolean
// {
//     return !!!(inputValue === '' || this.tags.findIndex(tag => tag.title.toLowerCase() === inputValue.toLowerCase()) > -1);
// }

// /**
//  * Add the email field
//  */
// addEmailField(): void
// {
//     // Create an empty email form group
//     const emailFormGroup = this._formBuilder.group({
//         email: [''],
//         label: ['']
//     });

//     // Add the email form group to the emails form array
//     (this.contactForm.get('emails') as FormArray).push(emailFormGroup);

//     // Mark for check
//     this._changeDetectorRef.markForCheck();
// }

// /**
//  * Remove the email field
//  *
//  * @param index
//  */
// removeEmailField(index: number): void
// {
//     // Get form array for emails
//     const emailsFormArray = this.contactForm.get('emails') as FormArray;

//     // Remove the email field
//     emailsFormArray.removeAt(index);

//     // Mark for check
//     this._changeDetectorRef.markForCheck();
// }

// /**
//  * Add an empty phone number field
//  */
// addPhoneNumberField(): void
// {
//     // Create an empty phone number form group
//     const phoneNumberFormGroup = this._formBuilder.group({
//         country    : ['us'],
//         phoneNumber: [''],
//         label      : ['']
//     });

//     // Add the phone number form group to the phoneNumbers form array
//     (this.contactForm.get('phoneNumbers') as FormArray).push(phoneNumberFormGroup);

//     // Mark for check
//     this._changeDetectorRef.markForCheck();
// }

// /**
//  * Remove the phone number field
//  *
//  * @param index
//  */
// removePhoneNumberField(index: number): void
// {
//     // Get form array for phone numbers
//     const phoneNumbersFormArray = this.contactForm.get('phoneNumbers') as FormArray;

//     // Remove the phone number field
//     phoneNumbersFormArray.removeAt(index);

//     // Mark for check
//     this._changeDetectorRef.markForCheck();
// }

// /**
//  * Get country info by iso code
//  *
//  * @param iso
//  */
// getCountryByIso(iso: string): Country
// {
//     return this.countries.find(country => country.iso === iso);
// }

trackByFn(index: number, item: any): any
{
    return item.id || index;
}
}
