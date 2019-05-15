import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FuiCheckbox, FuiCheckboxValueAccessor} from './components/checkbox';
import {FuiRadio, FuiRadioValueAccessor} from './components/radio';
import {FuiRadioManager} from './directives/radio-manager';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    FuiCheckbox,
    FuiCheckboxValueAccessor,
    FuiRadio,
    FuiRadioValueAccessor,
    FuiRadioManager
  ],
  exports: [
    FuiCheckbox,
    FuiCheckboxValueAccessor,
    FuiRadio,
    FuiRadioValueAccessor,
    FuiRadioManager
  ]
})
export class FuiCheckboxModule {
}
