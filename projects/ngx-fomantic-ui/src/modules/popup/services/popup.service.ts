import {Injectable} from '@angular/core';
import {PopupConfig} from '../classes/popup-config';

@Injectable()
export class FuiPopupConfig extends PopupConfig {
  constructor() {
    // We use an empty constructor to ensure Angular DI works correctly.
    super();
  }
}
