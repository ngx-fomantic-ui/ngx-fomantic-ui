import {Directive, HostBinding, Input} from '@angular/core';

@Directive({
  selector: '[fuiTabContent]'
})
export class FuiTabContent {
  @HostBinding('class.tab')
  public readonly hasClasses: boolean;

  @Input('fuiTabContent')
  public id: string;

  @HostBinding('class.active')
  public isActive: boolean;

  constructor() {
    this.isActive = false;

    this.hasClasses = true;
  }
}
