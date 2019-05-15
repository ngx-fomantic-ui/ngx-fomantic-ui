import {Directive, TemplateRef} from '@angular/core';

@Directive({selector: 'ng-template[fuiToastTitle]'})
export class FuiToastTitle {
  constructor(public templateRef: TemplateRef<any>) {
  }
}
