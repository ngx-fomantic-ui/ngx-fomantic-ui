import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FuiDropdownModule} from '../dropdown/internal';
import {FuiUtilityModule} from '../../misc/util/internal';
import {FuiLocalizationModule} from '../../behaviors/localization/internal';
import {FuiSelect, FuiSelectValueAccessor} from './components/select';
import {FuiSelectOption} from './components/select-option';
import {FuiSelectSearch} from './directives/select-search';
import {FuiMultiSelect, FuiMultiSelectValueAccessor} from './components/multi-select';
import {FuiMultiSelectLabel} from './components/multi-select-label';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FuiDropdownModule,
    FuiUtilityModule,
    FuiLocalizationModule
  ],
  declarations: [
    FuiSelect,
    FuiSelectOption,
    FuiSelectSearch,
    FuiSelectValueAccessor,
    FuiMultiSelect,
    FuiMultiSelectLabel,
    FuiMultiSelectValueAccessor
  ],
  exports: [
    FuiSelect,
    FuiSelectOption,
    FuiSelectSearch,
    FuiSelectValueAccessor,
    FuiMultiSelect,
    FuiMultiSelectValueAccessor
  ]
})
export class FuiSelectModule {
}
