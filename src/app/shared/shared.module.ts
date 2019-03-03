// Core modules
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './modules/material.module';

// Other modules
import {TranslateModule} from '@ngx-translate/core';
import {DropzoneModule} from 'ngx-dropzone-wrapper';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxGalleryModule} from 'ngx-gallery';

// Pipes
import {GetLangPipe} from './pipes/get-lang.pipe';
import {GetImageUrlPipe} from './pipes/get-image-url.pipe';
import {GetUserRegistrationFieldsPipe} from './pipes/get-user-registration-fields.pipe';
import {FixMatDatepickerDateFormatPipe} from './pipes/fix-mat-datepicker-date-format.pipe';
import {SetMatDatepickerAdapterLocalePipe} from './pipes/set-mat-datepicker-adapter-locale.pipe';
import {ReplaceAllPipe} from './pipes/replace-all.pipe';
import {GetMatTableDataSourcePipe} from './pipes/get-mat-table-data-source.pipe';
import {GenerateChildItemUrlPipe} from './pipes/generate-child-item-url.pipe';
import {BuildFolderUrlPipe} from './pipes/build-folder-url.pipe';
import {BuildFormDataPipe} from './pipes/build-form-data.pipe';

// Components
import {MaterialReusableTableComponent} from './components/material-reusable-table/material-reusable-table.component';
import {ShowItemsComponent} from './components/show-items/show-items.component';
import {ConfirmationDialogComponent} from './components/confirmation-dialog/confirmation-dialog.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {InfoBoxComponent} from './components/info-box/info-box.component';
import {EditItemComponent} from './components/edit-item/edit-item.component';
import {LanguagesComponent} from './components/languages/languages.component';

@NgModule({
  declarations: [
    NotFoundComponent,
    InfoBoxComponent,
    GetLangPipe,
    GetImageUrlPipe,
    GetUserRegistrationFieldsPipe,
    FixMatDatepickerDateFormatPipe,
    SetMatDatepickerAdapterLocalePipe,
    LanguagesComponent,
    ReplaceAllPipe,
    MaterialReusableTableComponent,
    GetMatTableDataSourcePipe,
    ShowItemsComponent,
    GenerateChildItemUrlPipe,
    ConfirmationDialogComponent,
    BuildFolderUrlPipe,
    EditItemComponent,
    BuildFormDataPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule,
    DropzoneModule,
    NgSelectModule,
    NgxGalleryModule
  ],
  providers: [
    GetLangPipe,
    GetImageUrlPipe,
    ReplaceAllPipe,
    GetUserRegistrationFieldsPipe,
    FixMatDatepickerDateFormatPipe,
    SetMatDatepickerAdapterLocalePipe,
    GetMatTableDataSourcePipe,
    GenerateChildItemUrlPipe,
    BuildFolderUrlPipe,
    BuildFormDataPipe,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule,
    DropzoneModule,
    NgSelectModule,
    NgxGalleryModule,
    GetLangPipe,
    GetImageUrlPipe,
    InfoBoxComponent,
    LanguagesComponent,
    ShowItemsComponent,
    EditItemComponent,
    MaterialReusableTableComponent,
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ]
})
export class SharedModule {
}
