import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FuiLocalizationService} from './services/localization.service';

@NgModule({
  imports: [CommonModule],
  providers: [FuiLocalizationService]
})
export class FuiLocalizationModule {
}
