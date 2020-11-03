import {Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FuiToastTitle} from '../directives/toast-title';
import {FuiToastMessage} from '../directives/toast-message';

@Component({
  selector: 'fui-toast',
  exportAs: 'fuiToast',
  template: `
    <div class="toast-box compact" (click)="(dismissible ? (!closeIcon ? close() : null) : null)">
      <div *ngIf="showProgress && showProgress === 'top'" class="ui attached active progress {{class}} {{showProgress}}">
        <div class="bar" [ngStyle]="{'transition': 'width ' + (displayTime / 1000)  + 's', 'width': progress + '%'}"
             style="width: 100%;"></div>
      </div>
      <div class="{{class}} {{className}}" [ngClass]="{'icon': showIcon}">
        <i *ngIf="closeIcon" class="close icon" (click)="close()"></i>
        <i *ngIf="showIcon" class="{{showIcon}} icon"></i>
        <div class="content">
          <ng-container *ngIf="title">
            <div class="header">{{title}}</div>
          </ng-container>
          <div class="header" *ngIf="titleTpl">
            <ng-template [ngTemplateOutlet]="titleTpl.templateRef"></ng-template>
          </div>
          <ng-container *ngIf="message">
            <div class="body">{{message}}</div>
          </ng-container>
          <div *ngIf="messageTpl" class="body">
            <ng-template [ngTemplateOutlet]="messageTpl.templateRef"></ng-template>
          </div>
        </div>
      </div>
      <div *ngIf="showProgress && showProgress === 'bottom'" class="ui attached active progress {{class}} {{showProgress}}">
        <div class="bar" [ngStyle]="{'transition': 'width ' + (displayTime / 1000)  + 's', 'width': progress + '%'}"
             style="width: 100%;"></div>
      </div>
    </div>
  `
})
export class FuiToast implements OnInit {
  @Input() dismissible: boolean;
  @Input() title: string;
  @Input() message: string;
  @Input() class: string;

  @Input() showIcon: any;
  @Input() closeIcon: boolean;
  @Input() className: any;

  @Input() progressUp?: boolean;
  @Input() showProgress?: string;
  @Input() displayTime?: number;

  @Input() id: number;

  @Output('close') closeEvent = new EventEmitter();

  @ContentChild(FuiToastTitle) titleTpl: FuiToastTitle;
  @ContentChild(FuiToastMessage) messageTpl: FuiToastMessage;

  progress: number;
  icons = {
    info: 'info',
    success: 'checkmark',
    warning: 'warning',
    error: 'times'
  };

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {

    this.dismissible = this.dismissible || true;
    this.title = this.title || '';
    this.message = this.message || '';
    this.class = this.class || 'info';

    if (typeof this.showIcon !== 'string') {
      if (this.showIcon === undefined || this.showIcon === null) {
        this.showIcon = this.icons[this.class];
      } else {
        this.showIcon = false;
      }
    }

    this.closeIcon = this.closeIcon || false;
    this.className = this.className || 'ui toast';

    this.progressUp = this.progressUp || true;
    this.displayTime = this.displayTime || 0;

    if (this.displayTime) {
      window.setTimeout(() => this.close(), this.displayTime);

      if (this.showProgress) {
        this.progress = this.progressUp ? 0 : 100;
        window.setTimeout(() => this.progress = this.progressUp ? 100 : 0, 300);
      }
    }
  }

  close() {
    this.elementRef.nativeElement.remove();
    this.closeEvent.next(this.id);
  }
}
