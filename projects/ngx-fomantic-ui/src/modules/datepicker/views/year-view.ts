import {Component, Renderer2} from '@angular/core';
import {DatePrecision, DateUtil, Util} from '../../../misc/util/internal';
import {CalendarView, CalendarViewType} from './calendar-view';
import {CalendarItem} from '../directives/calendar-item';
import {CalendarRangeService} from '../services/calendar-range.service';

export class CalendarRangeYearService extends CalendarRangeService {
  public configureItem(item: CalendarItem, baseDate: Date): void {
    item.humanReadable = Util.String.padLeft(item.date.getFullYear().toString(), 4, '0');
    item.isOutsideRange = item.date.getFullYear() >= this.calcStart(baseDate).getFullYear() + 10;
  }
}

@Component({
  selector: 'fui-calendar-year-view',
  template: `
<table class="ui celled center aligned unstackable table three column year">
<thead>
    <tr>
        <th colspan="3">
            <fui-calendar-view-title [ranges]="ranges" (zoomOut)="zoomOut()">
                {{ pad(decadeStart) }} - {{ pad(decadeStart + 10) }}
            </fui-calendar-view-title>
        </th>
    </tr>
</thead>
<tbody>
    <tr *ngFor="let group of ranges.current.groupedItems">
        <td class="link"
            *ngFor="let item of group"
            [calendarItem]="item"
            (click)="setDate(item)">{{ item.humanReadable }}
        </td>
    </tr>
</tbody>
</table>
`
})
export class FuiCalendarYearView extends CalendarView {
  constructor(renderer: Renderer2) {
    super(renderer, CalendarViewType.Year, new CalendarRangeYearService(DatePrecision.Decade, 4, 3));
  }

  public get decadeStart(): number {
    return DateUtil
      .startOf(DatePrecision.Decade, DateUtil.clone(this.service.currentDate))
      .getFullYear();
  }

  public pad(year: number): string {
    return Util.String.padLeft(year.toString(), 4, '0');
  }
}
