import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FuiTransition} from './directives/transition';

@NgModule({
  imports: [CommonModule],
  declarations: [
    FuiTransition
  ],
  exports: [
    FuiTransition
  ],
  providers: []
})
export class FuiTransitionModule {
}
