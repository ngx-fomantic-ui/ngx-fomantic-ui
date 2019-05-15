import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FuiTransitionModule} from '../transition/internal';
import {FuiDimmer} from './components/dimmer';

@NgModule({
  imports: [
    CommonModule,
    FuiTransitionModule
  ],
  declarations: [
    FuiDimmer
  ],
  exports: [
    FuiDimmer
  ]
})
export class FuiDimmerModule {
}
