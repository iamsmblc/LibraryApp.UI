import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LibraryComponent } from './library/library.component';
import { DevExtremeModule } from 'devextreme-angular';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 


import {
  DxDropDownBoxModule,
  DxDataGridModule,
  DxTagBoxModule,
  DxButtonModule,
  DxPopupModule,
  DxCheckBoxModule,
  DxScrollViewModule,
  DxValidatorModule,
  DxValidationSummaryModule,
  DxValidationGroupModule,

} from 'devextreme-angular';
import { AddBookComponent } from './add-book/add-book.component';

@NgModule({
  declarations: [
    AppComponent,
    LibraryComponent,
    AddBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({ positionClass: "toast-bottom-right", closeButton: true }),
    DevExtremeModule,
    DxDropDownBoxModule,
    DxDataGridModule,
    DxTagBoxModule,
    DxButtonModule,
    DxPopupModule,
    DxCheckBoxModule,
    DxScrollViewModule,
    
    DxValidationSummaryModule,
    DxValidatorModule,
    DxValidationGroupModule,
    BrowserAnimationsModule

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
