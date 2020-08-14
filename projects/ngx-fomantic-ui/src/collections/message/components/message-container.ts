import {Component, ElementRef, Input, ViewChild, ViewContainerRef} from '@angular/core';
import {MessageConfig} from '../classes/message-config';
import {ActiveMessage, FuiActiveMessage} from '../classes/active-message';
import {FuiMessage} from './message';
import {FuiComponentFactory} from '../../../misc/util/internal';
import {MessageController} from '../classes/message-controller';

@Component({
  selector: 'fui-message-container',
  template: `
<div #containerSibling></div>
`,
  styles: [`
:host {
    display: block;
}
:host >>> fui-message {
    display: block;
    margin-bottom: 1rem;
}
:host >>> fui-message:last-of-type {
    margin-bottom: 0;
}
:host >>> fui-message {
    cursor: pointer;
}
`]
})
export class FuiMessageContainer {
  @ViewChild('containerSibling', { read: ViewContainerRef })
  public containerSibling: ViewContainerRef;
  private _messages: ActiveMessage[];
  private _queue: ActiveMessage[];

  constructor(private _componentFactory: FuiComponentFactory, private _element: ElementRef) {
    this._messages = [];
    this._queue = [];
  }

  @Input()
  public set controller(controller: MessageController) {
    controller.registerContainer(this);
  }

  public show(config: MessageConfig, maxShown: number, showNewestFirst: boolean): FuiActiveMessage {
    const componentRef = this._componentFactory.createComponent(FuiMessage);
    componentRef.instance.loadConfig(config);

    const active = new ActiveMessage(config, componentRef)
      .onDismiss(() => this.onMessageClose(active, showNewestFirst));

    if (this._messages.length < maxShown) {
      this.open(active, showNewestFirst);
    } else {
      this.queue(active);
    }

    return active;
  }

  public dismissAll(): void {
    this._queue = [];
    this._messages.forEach(m => m.dismiss());
  }

  private open(message: ActiveMessage, showNewestFirst: boolean): void {
    this._messages.push(message);

    this._componentFactory.attachToView(message.componentRef, this.containerSibling);
    if (!showNewestFirst) {
      this._componentFactory.moveToElement(message.componentRef, this._element.nativeElement);
    }

    message.component.show();
  }

  private queue(message: ActiveMessage): void {
    this._queue.push(message);
  }

  private onMessageClose(message: ActiveMessage, showNewestFirst: boolean): void {
    this._messages = this._messages.filter(m => m !== message);

    if (this._queue.length > 0) {
      const [queued] = this._queue.slice(0, 1);

      this.open(queued, showNewestFirst);
    }
  }
}
