import {Directive, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, Renderer2, SimpleChanges} from '@angular/core';
import {AbstractControl, ValidationErrors} from '@angular/forms';
import {
  CustomValidator,
  customValidatorFactory,
  CustomValueAccessor,
  customValueAccessorFactory,
  ICustomValidatorHost,
  ICustomValueAccessorHost,
  KeyCode,
  PositioningPlacement,
  FuiComponentFactory
} from '../../../misc/util/internal';
import {IDatepickerLocaleValues, RecursivePartial, FuiLocalizationService} from '../../../behaviors/localization/internal';
import {PopupAfterOpen, PopupConfig, PopupTrigger, FuiPopupComponentController} from '../../popup/internal';
import {DatepickerMode, FuiDatepicker} from '../components/datepicker';
import {CalendarConfig, DateConfig, DatetimeConfig, MonthConfig, TimeConfig, YearConfig} from '../classes/calendar-config';

@Directive({
  selector: '[fuiDatepicker]',
  providers: [customValidatorFactory(FuiDatepickerDirective)]
})
export class FuiDatepickerDirective
  extends FuiPopupComponentController<FuiDatepicker>
  implements ICustomValueAccessorHost<Date>, ICustomValidatorHost, OnChanges, PopupAfterOpen {

  public config: CalendarConfig;
  @Input('pickerInitialDate')
  public initialDate?: Date;
  @Input('pickerMaxDate')
  public maxDate?: Date;
  @Input('pickerMinDate')
  public minDate?: Date;
  @Input('pickerFirstDayOfWeek')
  public firstDayOfWeek?: number;
  @Input('pickerLocaleOverrides')
  public localeOverrides: RecursivePartial<IDatepickerLocaleValues>;
  @Output('pickerSelectedDateChange')
  public onSelectedDateChange: EventEmitter<Date>;
  @Output('pickerValidatorChange')
  public onValidatorChange: EventEmitter<void>;

  constructor(renderer: Renderer2,
              element: ElementRef,
              componentFactory: FuiComponentFactory,
              public localizationService: FuiLocalizationService) {

    super(renderer, element, componentFactory, FuiDatepicker, new PopupConfig({
      trigger: PopupTrigger.Focus,
      placement: PositioningPlacement.BottomLeft,
      transition: 'scale',
      transitionDuration: 200
    }));

    // This ensures the popup is drawn correctly (i.e. no border).
    this._renderer.addClass(this.popup.elementRef.nativeElement, 'ui');
    this._renderer.addClass(this.popup.elementRef.nativeElement, 'calendar');

    this.onLocaleUpdate();
    this.localizationService.onLanguageUpdate.subscribe(() => this.onLocaleUpdate());

    this.onSelectedDateChange = new EventEmitter<Date>();
    this.onValidatorChange = new EventEmitter<void>();

    this.mode = DatepickerMode.Datetime;
  }

  @Input('pickerPlacement')
  public set placement(placement: PositioningPlacement) {
    this.popup.config.placement = placement;
  }

  @Input('pickerTransition')
  public set transition(transition: string) {
    this.popup.config.transition = transition;
  }

  @Input('pickerTransitionDuration')
  public set transitionDuration(duration: number) {
    this.popup.config.transitionDuration = duration;
  }

  private _selectedDate?: Date;

  public get selectedDate(): Date | undefined {
    return this._selectedDate;
  }

  public set selectedDate(date: Date | undefined) {
    this._selectedDate = date;
    this.onSelectedDateChange.emit(date);
  }

  private _mode: DatepickerMode;

  @Input('pickerMode')
  public get mode(): DatepickerMode {
    return this._mode;
  }

  public set mode(mode: DatepickerMode) {
    this._mode = mode || DatepickerMode.Datetime;
    switch (this._mode) {
      case DatepickerMode.Year:
        this.config = new YearConfig();
        break;
      case DatepickerMode.Month:
        this.config = new MonthConfig();
        break;
      case DatepickerMode.Date:
      default:
        this.config = new DateConfig();
        break;
      case DatepickerMode.Datetime:
        this.config = new DatetimeConfig();
        break;
      case DatepickerMode.Time:
        this.config = new TimeConfig();
        break;
    }
    this.writeValue(this.selectedDate);
  }

  private _localeValues: IDatepickerLocaleValues;

  public get localeValues(): IDatepickerLocaleValues {
    return this.localizationService.override<'datepicker'>(this._localeValues, this.localeOverrides);
  }

  public popupOnOpen(): void {
    if (this.componentInstance) {
      this.componentInstance.service.config = this.config;
      this.componentInstance.service.localeValues = this.localeValues;
      this.componentInstance.service.currentDate = this.initialDate || new Date();
      this.componentInstance.service.selectedDate = this.selectedDate;
      this.componentInstance.service.maxDate = this.maxDate;
      this.componentInstance.service.minDate = this.minDate;

      if (this.firstDayOfWeek != undefined) {
        this.componentInstance.service.firstDayOfWeek = this.firstDayOfWeek;
      }

      this.componentInstance.service.reset();

      this.componentInstance.service.onDateChange.subscribe((d: Date) => {
        this.selectedDate = d;
        this.close();
      });
    }
  }

  public ngOnChanges({maxDate, minDate, mode}: SimpleChanges): void {
    if (maxDate || minDate || mode) {
      this.onValidatorChange.emit();
    }
  }

  public validate(c: AbstractControl): ValidationErrors | null {
    const value = c.value;

    if (value != undefined) {
      // We post process the min & max date because sometimes this puts the date outside of the allowed range.
      if (this.minDate && value < this.minDate) {
        return {fuiMinDate: {required: this.minDate, actual: value}};
      }

      if (this.maxDate && value > this.maxDate) {
        return {fuiMaxDate: {required: this.maxDate, actual: value}};
      }
    }

    // Angular expects null
    // tslint:disable-next-line:no-null-keyword
    return null;
  }

  public writeValue(value: Date | undefined): void {
    this.selectedDate = value;

    if (this.componentInstance) {
      this.componentInstance.service.selectedDate = value;
    }
  }

  @HostListener('keydown', ['$event'])
  public onKeyDown(e: KeyboardEvent): void {
    if (e.keyCode === KeyCode.Escape) {
      this.close();
    }
  }

  private onLocaleUpdate(): void {
    this._localeValues = this.localizationService.get().datepicker;
  }
}

@Directive({
  selector: '[fuiDatepicker]',
  host: {'(pickerSelectedDateChange)': 'onChange($event)'},
  providers: [customValueAccessorFactory(FuiDatepickerDirectiveValueAccessor)]
})
export class FuiDatepickerDirectiveValueAccessor extends CustomValueAccessor<Date, FuiDatepickerDirective> {
  constructor(public host: FuiDatepickerDirective) {
    super(host);
  }
}

@Directive({
  selector: '[fuiDatepicker]',
  host: {'(pickerValidatorChange)': 'onValidatorChange()'},
  providers: [customValidatorFactory(FuiDatepickerDirectiveValidator)]
})
export class FuiDatepickerDirectiveValidator extends CustomValidator<FuiDatepickerDirective> {
  constructor(public host: FuiDatepickerDirective) {
    super(host);
  }
}
