import {Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'fui-progress',
  template: `
<div class="bar"
    [style.width.%]="percentage"
    [style.minWidth]="canCompletelyEmpty ? 0 : null"
    [style.transitionTimingFunction]="transition"
    [style.transitionDuration.ms]="transitionDuration">
    <div class="progress" *ngIf="showProgress">{{ percentage }}%</div>
</div>
<div class="label">
    <ng-content></ng-content>
</div>
`,
  styles: [`
.bar {
    transition-duration: 300ms !important;
    z-index: 1;
}
`]
})
export class FuiProgress {
  @Input()
  public transition: string;

  @Input()
  public transitionDuration: number;

  @Input()
  public canCompletelyEmpty: boolean;
  @HostBinding('class.ui')
  @HostBinding('class.progress')
  public readonly hasClasses: boolean;
  @Input()
  public autoSuccess: boolean;
  @Input()
  public showProgress: boolean;
  private _overrideSuccess: boolean;

  constructor() {
    this.value = 0;
    this.maximum = 100;
    this.precision = 0;

    this._overrideSuccess = false;
    this.autoSuccess = true;
    this.showProgress = true;

    this.hasClasses = true;
  }

  @HostBinding('class.success')
  public get reachedMaximum(): boolean {
    return this._overrideSuccess || ((this.value >= this.maximum) && this.autoSuccess);
  }

  @HostBinding('attr.data-percent')
  public get percentage(): string {
    const boundedValue = Math.min(Math.max(this.value, 0), this.maximum);

    const percentage = (boundedValue / this.maximum) * 100;

    return percentage.toFixed(this.precision);
  }

  @Input('class')
  public set classValue(classes: string) {
    if (classes.includes('attached') || classes.includes('tiny')) {
      this.showProgress = false;
    }
    if (classes.includes('success')) {
      this._overrideSuccess = true;
    }

    this.transition = 'ease';
    this.transitionDuration = 350;
    this.canCompletelyEmpty = false;
  }

  private _value: number;

  @Input()
  public get value(): number {
    return this._value;
  }

  public set value(value: number) {
    // Convert value from string to number where necessary.
    const converted = +value;

    if (Number.isNaN(converted)) {
      return;
    }

    this._value = converted;
  }

  private _maximum: number;

  @Input()
  public get maximum(): number {
    return this._maximum;
  }

  public set maximum(value: number) {
    // Convert value from string to number where necessary.
    const converted = +value;

    if (Number.isNaN(converted)) {
      return;
    }

    this._maximum = converted;
  }

  private _precision: number;

  @Input()
  public get precision(): number {
    return this._precision;
  }

  public set precision(value: number) {
    // Convert value from string to number where necessary.
    const converted = +value;

    if (Number.isNaN(converted)) {
      return;
    }

    this._precision = Math.min(Math.max(converted, 0), 20);
  }
}
