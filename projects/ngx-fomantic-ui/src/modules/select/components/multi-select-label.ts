import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {FuiTransition, Transition, TransitionController, TransitionDirection} from '../../transition/internal';
import {HandledEvent, FuiComponentFactory} from '../../../misc/util/internal';
import {IOptionContext} from '../classes/select-base';

// See https://github.com/Microsoft/TypeScript/issues/13449.
const templateRef = TemplateRef;

@Component({
  selector: 'fui-multi-select-label',
  template: `
<span #templateSibling></span>
<span *ngIf="!template" [innerHTML]="formatter(value)"></span>
<i class="delete icon" (click)="deselectOption($event)"></i>
`
})
export class FuiMultiSelectLabel<T> extends FuiTransition {

  // Doing it on the host enables use in menus etc.
  @HostBinding('class.ui')
  @HostBinding('class.label')
  public readonly hasClasses: boolean;
  @Input()
  public value: T;

  // Sets the Fomantic UI classes on the host element.
  @Input()
  public query?: string;
  @Output('deselected')
  public onDeselected: EventEmitter<T>;
  @Input()
  public formatter: (obj: T) => string;
  // Placeholder to draw template beside.
  @ViewChild('templateSibling', { read: ViewContainerRef })
  public templateSibling: ViewContainerRef;
  private _transitionController: TransitionController;

  constructor(renderer: Renderer2,
              element: ElementRef,
              changeDetector: ChangeDetectorRef,
              public componentFactory: FuiComponentFactory) {

    super(renderer, element, changeDetector);

    // Initialise transition functionality.
    this._transitionController = new TransitionController(false, 'inline-block');
    this.setTransitionController(this._transitionController);

    this.onDeselected = new EventEmitter<T>();

    this.hasClasses = true;

    this._transitionController.animate(new Transition('scale', 100, TransitionDirection.In));
  }

  private _template?: TemplateRef<IOptionContext<T>>;

  @Input()
  public get template(): TemplateRef<IOptionContext<T>> | undefined {
    return this._template;
  }

  public set template(template: TemplateRef<IOptionContext<T>> | undefined) {
    this._template = template;
    if (this.template) {
      this.componentFactory.createView(this.templateSibling, this.template, {
        $implicit: this.value,
        query: this.query
      });
    }
  }

  public deselectOption(e: HandledEvent): void {
    e.eventHandled = true;

    this._transitionController.animate(
      new Transition('scale', 100, TransitionDirection.Out, () =>
        this.onDeselected.emit(this.value)));
  }

  @HostListener('click', ['$event'])
  public onClick(e: HandledEvent): void {
    e.eventHandled = true;
  }
}
