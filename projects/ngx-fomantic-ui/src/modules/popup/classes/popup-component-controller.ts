import { ComponentRef, ElementRef, Renderer2, Type, Directive } from '@angular/core';
import {FuiComponentFactory} from '../../../misc/util/internal';
import {FuiPopupController} from './popup-controller';
import {PopupConfig} from './popup-config';

@Directive()
export class FuiPopupComponentController<T> extends FuiPopupController {
  // Stores reference to generated content component.
  private _contentComponentRef?: ComponentRef<T>;

  constructor(renderer: Renderer2,
              element: ElementRef,
              componentFactory: FuiComponentFactory,
              private _component: Type<T>,
              config: PopupConfig) {

    super(renderer, element, componentFactory, config);
  }

  public get componentInstance(): T | undefined {
    if (this._contentComponentRef) {
      return this._contentComponentRef.instance;
    }
  }

  public open(): void {
    if (!this._contentComponentRef) {
      this._contentComponentRef = this._componentFactory.createComponent(this._component as Type<T>);
      this._componentFactory.attachToView(this._contentComponentRef, this.popup.templateSibling);
    }

    super.open();
  }

  protected cleanup(): void {
    super.cleanup();

    if (this._contentComponentRef) {
      this._contentComponentRef.destroy();
      this._contentComponentRef = undefined;
    }
  }
}
