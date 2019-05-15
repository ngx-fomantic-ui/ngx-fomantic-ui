import {Directive, ElementRef, Host, HostBinding, HostListener, Input, Renderer2} from '@angular/core';
import {DateUtil} from '../../../misc/util/internal';
import {FuiLocalizationService} from '../../../behaviors/localization/internal';
import {PopupTrigger} from '../../popup/internal';
import {FuiDatepickerDirective, FuiDatepickerDirectiveValueAccessor} from './datepicker.directive';
import {DateParser, InternalDateParser} from '../classes/date-parser';

@Directive({
  selector: 'input[fuiDatepicker]'
})
export class FuiDatepickerInputDirective {

  private _currentInputValue: string | undefined;
  private _lastUpdateTyped: boolean;

  constructor(@Host() public datepicker: FuiDatepickerDirective,
              @Host() public valueAccessor: FuiDatepickerDirectiveValueAccessor,
              private _renderer: Renderer2,
              private _element: ElementRef,
              localizationService: FuiLocalizationService) {

    this.useNativeOnMobile = true;
    this.fallbackActive = false;

    // Whenever the datepicker value updates, update the input text alongside it.
    this.datepicker.onSelectedDateChange.subscribe(() =>
      this.updateValue(this.selectedDateString));

    localizationService.onLanguageUpdate.subscribe(() =>
      this.updateValue(this.selectedDateString));
  }

  public get parser(): DateParser {
    if (this.fallbackActive) {
      return new InternalDateParser(this.datepicker.mode, this.datepicker.localeValues);
    }
    return new DateParser(this.datepicker.localeValues.formats[this.datepicker.mode], this.datepicker.localeValues);
  }

  public get selectedDateString(): string | undefined {
    if (this.datepicker.selectedDate) {
      return this.parser.format(this.datepicker.selectedDate);
    }
  }

  @HostBinding('attr.type')
  public get type(): string {
    if (this.fallbackActive) {
      return this.datepicker.config.fallback;
    }
    return 'text';
  }

  @HostBinding('attr.max')
  public get max(): string | undefined {
    if (this.fallbackActive && this.datepicker.maxDate) {
      // Since HTML doesn't use a date object max is somewhat tricky.
      // Our Datepicker will always choose the 1st date on the provided precision,
      // meaning anything below the maxDate will work, hence endOf.
      const max = DateUtil.endOf(this.datepicker.config.precision, DateUtil.clone(this.datepicker.maxDate));
      return this.parser.format(max);
    }
  }

  @HostBinding('attr.min')
  public get min(): string | undefined {
    if (this.fallbackActive && this.datepicker.minDate) {
      // Since HTML doesn't use a date object min is somewhat tricky.
      // We use 1 minute before the next date at the configured precision since
      // our Datepicker picks the first available date at that precision.
      const min = DateUtil.clone(this.datepicker.minDate);
      return this.parser.format(min);
    }
  }

  private _useNativeOnMobile: boolean;

  @Input('pickerUseNativeOnMobile')
  public get useNativeOnMobile(): boolean {
    return this._useNativeOnMobile;
  }

  public set useNativeOnMobile(fallback: boolean) {
    this._useNativeOnMobile = fallback;
    const isOnMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent);
    this.fallbackActive = this.useNativeOnMobile && isOnMobile;
  }

  private _fallbackActive: boolean;

  public get fallbackActive(): boolean {
    return this._fallbackActive;
  }

  public set fallbackActive(active: boolean) {
    this._fallbackActive = active;
    // If the fallback is active, then the trigger must be manual so the datepicker never opens.
    this.datepicker.popup.config.trigger = this.fallbackActive ? PopupTrigger.Manual : PopupTrigger.Focus;
    // Update the input value (this will insert the `T` as required).
    this.updateValue(this.selectedDateString);
  }

  @HostListener('input', ['$event.target.value'])
  public typeValue(value: string | undefined): void {
    this._lastUpdateTyped = true;
    this._currentInputValue = value;

    if (!value) {
      // Delete the selected date if no date was entered manually.
      return this.datepicker.writeValue(undefined);
    }

    const parsed = this.parser.parse(value, this.datepicker.selectedDate);
    if (!isNaN(parsed.getTime()) && value === this.parser.format(parsed)) {
      return this.datepicker.writeValue(parsed);
    }
    return this.datepicker.writeValue(undefined);
  }

  @HostListener('focusout')
  public onFocusOut(): void {
    this.valueAccessor.onTouched();
  }

  private updateValue(value: string | undefined): void {
    // Only update the current value if it is different to what it's being updated to.
    // This is so that the editing position isn't changed when manually typing the date.
    if (!this._lastUpdateTyped) {
      this._renderer.setProperty(this._element.nativeElement, 'value', value || '');
    }

    this._lastUpdateTyped = false;
  }
}
