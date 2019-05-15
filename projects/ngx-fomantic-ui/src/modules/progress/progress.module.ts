import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FuiProgress} from './components/progress';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FuiProgress
  ],
  exports: [
    FuiProgress
  ]
})
export class FuiProgressModule {
}
