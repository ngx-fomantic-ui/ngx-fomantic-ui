import {ChangeDetectorRef, Directive, EventEmitter, HostBinding, HostListener, Input} from '@angular/core';

export class CalendarItem {
  public date: Date;
  public humanReadable: string;
  public isDisabled: boolean;
  public isActive: boolean;
  public isOutsideRange: boolean;
  public isToday: boolean;
  public isSelectable: boolean;

  constructor(date: Date) {
    this.date = date;
  }
}

@Directive({
  selector: '[calendarItem]'
})
export class FuiCalendarItem {
  @Input('calendarItem')
  public item: CalendarItem;
  @HostBinding('class.focus')
  public hasFocus: boolean;
  public onFocussed: EventEmitter<boolean>;

  constructor(public changeDetector: ChangeDetectorRef) {
    this.hasFocus = false;

    this.onFocussed = new EventEmitter<boolean>();
  }

  @HostBinding('class.disabled')
  public get isSelectable(): boolean {
    return this.item.isSelectable;
  }

  @HostBinding('class.active')
  public get isActive(): boolean {
    return this.item.isActive;
  }

  @HostBinding('class.today')
  public get isToday(): boolean {
    return this.item.isToday;
  }

  @HostListener('mousemove')
  public onMouseMove(): void {
    if (!this.hasFocus) {
      this.hasFocus = true;
      this.onFocussed.emit(this.hasFocus);
    }
  }

  @HostListener('mouseleave')
  public onMouseLeave(): void {
    this.hasFocus = false;
    this.onFocussed.emit(this.hasFocus);
  }
}
