import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FuiComponentFactory} from './services/component-factory.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    FuiComponentFactory
  ]
})
export class FuiUtilityModule {
}
