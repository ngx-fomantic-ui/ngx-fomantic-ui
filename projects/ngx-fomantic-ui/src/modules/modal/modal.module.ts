import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FuiDimmerModule} from '../dimmer/internal';
import {FuiTransitionModule} from '../transition/internal';
import {FuiUtilityModule} from '../../misc/util/internal';
import {FuiModalService} from './services/modal.service';
import {FuiModal} from './components/modal';
import {FuiModalDimmer} from './components/dimmer';

@NgModule({
  imports: [
    CommonModule,
    FuiDimmerModule,
    FuiTransitionModule,
    FuiUtilityModule
  ],
  declarations: [
    FuiModal,
    FuiModalDimmer
  ],
  exports: [
    FuiModal
  ],
  providers: [
    FuiModalService
  ],
  entryComponents: [
    FuiModal
  ]
})
export class FuiModalModule {
}
