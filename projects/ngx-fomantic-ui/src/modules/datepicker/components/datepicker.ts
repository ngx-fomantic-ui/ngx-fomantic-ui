import {Component, HostBinding, HostListener} from '@angular/core';
import {CalendarService} from './../services/calendar.service';
import {DatetimeConfig} from '../classes/calendar-config';
import {FuiLocalizationService} from '../../../behaviors/localization/internal';

export type DatepickerMode = 'year' | 'month' | 'date' | 'datetime' | 'time';

export const DatepickerMode = {
  Year: 'year' as DatepickerMode,
  Month: 'month' as DatepickerMode,
  Date: 'date' as DatepickerMode,
  Datetime: 'datetime' as DatepickerMode,
  Time: 'time' as DatepickerMode
};

@Component({
  selector: 'fui-datepicker',
  template: `
<ng-container [ngSwitch]="service.currentView">
    <fui-calendar-year-view [service]="service" *ngSwitchCase="0"></fui-calendar-year-view>
    <fui-calendar-month-view [service]="service" *ngSwitchCase="1"></fui-calendar-month-view>
    <fui-calendar-date-view [service]="service" *ngSwitchCase="2"></fui-calendar-date-view>
    <fui-calendar-hour-view [service]="service" *ngSwitchCase="3"></fui-calendar-hour-view>
    <fui-calendar-minute-view [service]="service" *ngSwitchCase="4"></fui-calendar-minute-view>
</ng-container>
`,
  styles: [`
:host {
    user-select: none;
}
`]
})
export class FuiDatepicker {
  @HostBinding('class.ui')
  @HostBinding('class.active')
  @HostBinding('class.calendar')
  public readonly hasClasses: boolean;

  public service: CalendarService;

  constructor(localizationService: FuiLocalizationService) {
    this.service = new CalendarService(new DatetimeConfig(), localizationService.get().datepicker);

    this.hasClasses = true;
  }

  @HostListener('mousedown', ['$event'])
  public onMouseDown(e: MouseEvent): void {
    e.preventDefault();
  }
}
