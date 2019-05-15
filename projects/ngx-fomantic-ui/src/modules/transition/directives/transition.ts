import {ChangeDetectorRef, Directive, ElementRef, HostBinding, Input, Renderer2} from '@angular/core';
import {TransitionController} from '../classes/transition-controller';

@Directive({
  selector: '[fuiTransition]',
  exportAs: 'transition'
})
export class FuiTransition {
  @HostBinding('class.transition')
  public transitionClass = true;
  // Each transition must have a controller associated that dispatches the transitions.
  private _controller: TransitionController;

  constructor(protected _renderer: Renderer2, protected _element: ElementRef, private _changeDetector: ChangeDetectorRef) {
  }

  @Input()
  public set fuiTransition(tC: TransitionController) {
    // Set the transition controller (e.g. '<div [fuiTransition]="transitionController"></div>').
    this.setTransitionController(tC);
  }

  @HostBinding('class.visible')
  public get isVisible(): boolean {
    if (this._controller) {
      return this._controller.isVisible;
    }
    return false;
  }

  @HostBinding('class.hidden')
  public get isHidden(): boolean {
    if (this._controller) {
      return this._controller.isHidden;
    }
    return false;
  }

  // Initialises the controller with the injected renderer and elementRef.
  public setTransitionController(transitionController: TransitionController): void {
    this._controller = transitionController;
    this._controller.registerRenderer(this._renderer);
    this._controller.registerElement(this._element.nativeElement);
    this._controller.registerChangeDetector(this._changeDetector);
  }
}
