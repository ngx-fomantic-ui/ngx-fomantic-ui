import {Directive, TemplateRef} from '@angular/core';

@Directive({selector: 'ng-template[fuiToastMessage]',})
export class FuiToastMessage {
  constructor(public templateRef: TemplateRef<any>) {
  }
}
