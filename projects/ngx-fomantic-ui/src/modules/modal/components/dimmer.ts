import {ChangeDetectorRef, Component, ElementRef, HostBinding, Renderer2} from '@angular/core';
import {FuiDimmer} from '../../dimmer/internal';

@Component({
  selector: 'fui-modal-dimmer',
  template: `<ng-content></ng-content>`,
  styles: [`
        :host.ui.dimmer:not(.hidden) {
            transition: none;
            overflow-y: auto;
            display: flex !important;
        }
    `]
})
export class FuiModalDimmer extends FuiDimmer {

  @HostBinding('class.page')
  @HostBinding('class.modals')
  public readonly hasClasses: boolean;

  constructor(renderer: Renderer2, element: ElementRef, changeDetector: ChangeDetectorRef) {
    super(renderer, element, changeDetector);
    this.hasClasses = true;
    this.isClickable = false;
  }
}
