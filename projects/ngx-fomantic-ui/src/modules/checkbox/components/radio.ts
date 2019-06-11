import {Component, Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, ViewChild} from '@angular/core';
import {CustomValueAccessor, customValueAccessorFactory, ICustomValueAccessorHost} from '../../../misc/util/internal';

@Component({
  selector: 'fui-radio-button',
  template: `
<input class="hidden"
       type="checkbox"
       [attr.name]="name"
       [attr.checked]="checkedAttribute"
       [attr.disabled]="isDisabledAttribute"
       [ngModel]="isChecked"
       (ngModel)="currentValue = value"
       #radio>
<label>
    <ng-content></ng-content>
</label>
`
})
export class FuiRadio<T> implements ICustomValueAccessorHost<T> {
  @HostBinding('class.ui')
  @HostBinding('class.radio')
  @HostBinding('class.checkbox')
  public readonly hasClasses: boolean;

  @Input()
  public name: string;

  @Input()
  public value: T;

  @HostBinding('class.checked')
  public isChecked: boolean;

  public currentValue: T;

  @Output('currentValueChange')
  public onCurrentValueChange: EventEmitter<T>;

  @Output('touched')
  public onTouched: EventEmitter<void>;

  @Input()
  public isDisabled: boolean;

  @HostBinding('class.read-only')
  @Input()
  public isReadonly: boolean;

  @ViewChild('radio', {static: false})
  private _radioElement: ElementRef;

  constructor() {
    this.isChecked = false;
    this.onCurrentValueChange = new EventEmitter<T>();
    this.onTouched = new EventEmitter<void>();

    this.isDisabled = false;
    this.isReadonly = false;

    this.hasClasses = true;
  }

  public get checkedAttribute(): string | undefined {
    return this.isChecked ? '' : undefined;
  }

  public get isDisabledAttribute(): string | undefined {
    return this.isDisabled ? 'disabled' : undefined;
  }

  @HostListener('mousedown', ['$event'])
  public onMouseDown(e: MouseEvent): void {
    e.preventDefault();
  }

  @HostListener('click')
  public onClick(): void {
    if (!this.isDisabled && !this.isReadonly) {
      this.currentValue = this.value;
      this.onCurrentValueChange.emit(this.currentValue);
      this.update();
      this.focusRadio();
    }
  }

  @HostListener('focusout')
  public onFocusOut(): void {
    this.onTouched.emit();
  }

  public update(): void {
    this.isChecked = this.currentValue === this.value;
  }

  public writeValue(value: T): void {
    this.currentValue = value;
    this.update();
  }

  private focusRadio(): void {
    this._radioElement.nativeElement.focus();
  }
}

@Directive({
  selector: 'fui-radio-button',
  host: {
    '(currentValueChange)': 'onChange($event)',
    '(touched)': 'onTouched()'
  },
  providers: [customValueAccessorFactory(FuiRadioValueAccessor)]
})
export class FuiRadioValueAccessor<T> extends CustomValueAccessor<T, FuiRadio<T>> {
  constructor(host: FuiRadio<T>) {
    super(host);
  }
}
