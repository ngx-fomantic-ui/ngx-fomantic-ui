import {Component, Directive, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';
import {CustomValueAccessor, customValueAccessorFactory, ICustomValueAccessorHost} from '../../../misc/util/internal';

@Component({
  selector: 'fui-rating',
  // tslint:disable-next-line
  template: `<i *ngFor="let icon of icons; let i = index" class="icon {{type}}" (mouseover)="onMouseover(i)" (click)="onClick(i)" [class.selected]="hoveredIndex >= i && !isReadonly" [class.active]="value > i"></i>`,
  styles: [`
:host.read-only .icon {
    cursor: auto
}
`]
})
export class FuiRating implements ICustomValueAccessorHost<number> {

  @HostBinding('class.ui')
  @HostBinding('class.rating')
  public readonly hasClasses: boolean;
  public value: number;
  @Output()
  public valueChange: EventEmitter<number>;
  @HostBinding('class.read-only')
  @Input()
  public isReadonly: boolean;
  public hoveredIndex = -1;

  constructor() {
    this.value = 0;
    this.valueChange = new EventEmitter<number>();

    this.type = 'star';
    this.maximum = 5;
    this.isReadonly = false;

    this.hasClasses = true;
  }

  public get icons(): undefined[] {
    // tslint:disable-next-line:prefer-literal
    return new Array(this.maximum);
  }

  private _type: string;

  @Input()
  public get type(): string {
    return this._type;
  }

  public set type(value: string) {
    this._type = value;
  }

  private _maximum: number;

  @Input()
  public get maximum(): number {
    return this._maximum;
  }

  public set maximum(value: number) {
    this._maximum = +value;
  }

  public onClick(i: number): void {
    if (!this.isReadonly) {
      this.value = i + 1;
      this.valueChange.emit(this.value);
    }
  }

  public onMouseover(i: number): void {
    this.hoveredIndex = i;
  }

  @HostListener('mouseout')
  public onMouseout(): void {
    this.hoveredIndex = -1;
  }

  public writeValue(value: number): void {
    this.value = value;
  }
}

@Directive({
  selector: 'fui-rating',
  host: {'(valueChange)': 'onChange($event)'},
  providers: [customValueAccessorFactory(FuiRatingValueAccessor)]
})
export class FuiRatingValueAccessor extends CustomValueAccessor<number, FuiRating> {
  constructor(host: FuiRating) {
    super(host);
  }
}
