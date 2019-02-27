import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "./modules/material.module";
import {NotFoundComponent} from './components/not-found/not-found.component';
import {TranslateModule} from "@ngx-translate/core";
import {InfoBoxComponent} from "./components/info-box/info-box.component";
import {GetLangPipe} from './pipes/get-lang.pipe';
import {DropzoneModule} from "ngx-dropzone-wrapper";
import {GetImageUrlPipe} from './pipes/get-image-url.pipe';
import {GetUserRegistrationFieldsPipe} from './pipes/get-user-registration-fields.pipe';
import {FixMatDatepickerDateFormatPipe} from './pipes/fix-mat-datepicker-date-format.pipe';
import {SetMatDatepickerAdapterLocalePipe} from './pipes/set-mat-datepicker-adapter-locale.pipe';
import {LanguagesComponent} from './components/languages/languages.component';
import {ReplaceAllPipe} from './pipes/replace-all.pipe';
import {MaterialReusableTableComponent} from './components/material-reusable-table/material-reusable-table.component';
import {GetMatTableDataSourcePipe} from './pipes/get-mat-table-data-source.pipe';
import {ShowItemsComponent} from './components/show-items/show-items.component';
import {GenerateChildItemUrlPipe} from './pipes/generate-child-item-url.pipe';
import {ConfirmationDialogComponent} from './components/confirmation-dialog/confirmation-dialog.component';
import {BuildFolderUrlPipe} from './pipes/build-folder-url.pipe';
import {BuildFormDataPipe} from './pipes/build-form-data.pipe';

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
    BuildFormDataPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule,
    DropzoneModule
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
    BuildFormDataPipe
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule,
    DropzoneModule,
    InfoBoxComponent,
    LanguagesComponent,
    ShowItemsComponent,
    MaterialReusableTableComponent,
    GetLangPipe,
    GetImageUrlPipe,
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ]
})
export class SharedModule {
}
