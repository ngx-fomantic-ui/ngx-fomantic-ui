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
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {FuiDropdownMenuItem} from '../../dropdown/internal';
import {HandledEvent} from '../../../misc/util/internal';

@Component({
  selector: 'fui-select-option',
  template: `
<span #templateSibling></span>
<span [innerHTML]="renderedText"></span>
`
})
export class FuiSelectOption<T> extends FuiDropdownMenuItem {
  // Sets the Fomantic UI classes on the host element.
  @HostBinding('class.item')
  public readonly hasClasses: boolean;

  @Input()
  public value: T;

  // Fires when the option is selected, whether by clicking or by keyboard.
  @Output()
  public onSelected: EventEmitter<T>;

  @HostBinding('class.active')
  public isActive: boolean;

  public renderedText?: string;
  public usesTemplate: boolean;
  // Placeholder to draw template beside.
  @ViewChild('templateSibling', { read: ViewContainerRef })
  public templateSibling: ViewContainerRef;

  constructor(renderer: Renderer2, element: ElementRef, public changeDetector: ChangeDetectorRef) {
    // We inherit FuiDropdownMenuItem to automatically gain all keyboard navigation functionality.
    // This is not done via adding the .item class because it isn't supported by Angular.
    super(renderer, element);

    this.hasClasses = true;
    this.isActive = false;
    this.onSelected = new EventEmitter<T>();

    // By default we make the default text an empty label, for the brief moment when it isn't displaying the correct one.
    this.renderedText = '';

    this.usesTemplate = false;
  }

  public set formatter(formatter: (obj: T) => string) {
    if (!this.usesTemplate) {
      this.renderedText = formatter(this.value);
    } else {
      this.renderedText = '';
    }
  }

  @HostListener('click', ['$event'])
  public onClick(e: HandledEvent): void {
    e.eventHandled = true;

    setTimeout(() => this.onSelected.emit(this.value));
  }
}
