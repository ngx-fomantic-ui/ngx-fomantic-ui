import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FuiDropdownModule} from '../dropdown/internal';
import {FuiLocalizationModule} from '../../behaviors/localization/internal';
import {FuiUtilityModule} from '../../misc/util/internal';
import {FuiSearch} from './components/search';
import {FuiSearchResult} from './components/search-result';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FuiDropdownModule,
    FuiLocalizationModule,
    FuiUtilityModule
  ],
  declarations: [
    FuiSearch,
    FuiSearchResult
  ],
  exports: [
    FuiSearch
  ]
})
export class FuiSearchModule {
}
