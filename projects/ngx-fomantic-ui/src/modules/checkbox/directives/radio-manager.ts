import {AfterContentInit, ContentChildren, Directive, ElementRef, QueryList} from '@angular/core';
import {FuiRadio} from '../components/radio';
import {Subscription} from 'rxjs';
import {Util} from '../../../misc/util/internal';

@Directive({
  selector: 'form:not([ngForm]):not([[ngForm]]),ngForm,[ngForm]'
})
export class FuiRadioManager<T> implements AfterContentInit {

  public isNested: boolean;

  @ContentChildren(FuiRadioManager, {descendants: true})
  private _subManagers: QueryList<FuiRadioManager<T>>;

  @ContentChildren(FuiRadio, {descendants: true})
  private _renderedRadios: QueryList<FuiRadio<T>>;

  private _radioSubs: Subscription[];

  constructor(public element: ElementRef) {
    this.isNested = false;
    this._radioSubs = [];
  }

  public ngAfterContentInit(): void {
    this.updateNesting();
    this._subManagers.changes.subscribe(() => this.updateNesting());

    this.updateRadios();
    this._renderedRadios.changes.subscribe(() => this.updateRadios());
  }

  private updateNesting(): void {
    this._subManagers
      .filter(m => m !== this)
      .forEach(m => m.isNested = true);
  }

  private updateRadios(): void {
    this._radioSubs.forEach(s => s.unsubscribe());
    this._radioSubs = [];

    const groups = Util.Array.groupBy(this._renderedRadios.toArray(), 'name');
    Object
      .keys(groups)
      .map(k => groups[k])
      .forEach(g => g
        .forEach(r => this._radioSubs
          .push(r.onCurrentValueChange
            .subscribe((v: T) => {
              if (!this.isNested) {
                g.forEach(radio => radio.writeValue(v));
              }
            }))));
  }
}
