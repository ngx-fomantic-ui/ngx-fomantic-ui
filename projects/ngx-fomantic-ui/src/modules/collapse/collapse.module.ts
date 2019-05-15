import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FuiCollapse} from './directives/collapse';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FuiCollapse
  ],
  exports: [
    FuiCollapse
  ]
})
export class FuiCollapseModule {
}
