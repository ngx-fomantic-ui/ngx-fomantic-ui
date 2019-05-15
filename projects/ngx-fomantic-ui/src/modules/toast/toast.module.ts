import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FuiToast} from './classes/toast';
import {FuiToastContainer} from './classes/toast-container';
import {FuiToastTitle} from './directives/toast-title';
import {FuiToastMessage} from './directives/toast-message';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FuiToastTitle,
    FuiToastMessage,
    FuiToast,
    FuiToastContainer
  ],
  exports: [
    FuiToastTitle,
    FuiToastMessage,
    FuiToast,
    FuiToastContainer
  ]
})
export class FuiToastModule {
}
