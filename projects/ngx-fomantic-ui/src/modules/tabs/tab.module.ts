import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FuiTabset} from './components/tabset';
import {FuiTabHeader} from './directives/tab-header';
import {FuiTabContent} from './directives/tab-content';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FuiTabset,
    FuiTabHeader,
    FuiTabContent
  ],
  exports: [
    FuiTabset,
    FuiTabHeader,
    FuiTabContent
  ]
})
export class FuiTabsModule {
}
