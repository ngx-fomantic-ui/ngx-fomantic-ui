import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FuiTransitionModule} from '../transition/internal';
import {FuiDropdown} from './directives/dropdown';
import {FuiDropdownMenu, FuiDropdownMenuItem} from './directives/dropdown-menu';

@NgModule({
  imports: [
    CommonModule,
    FuiTransitionModule
  ],
  declarations: [
    FuiDropdown,
    FuiDropdownMenu,
    FuiDropdownMenuItem
  ],
  exports: [
    FuiDropdown,
    FuiDropdownMenu,
    FuiDropdownMenuItem
  ]
})
export class FuiDropdownModule {
}
