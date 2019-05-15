import {MessageConfig} from './message-config';
import {ComponentRef} from '@angular/core';
import {FuiMessage} from '../components/message';

export abstract class FuiActiveMessage {
  public abstract onClick(callback: () => void): FuiActiveMessage;

  public abstract onDismiss(callback: () => void): FuiActiveMessage;

  public abstract dismiss(): void;
}

export class ActiveMessage implements FuiActiveMessage {
  public config: MessageConfig;
  public componentRef: ComponentRef<FuiMessage>;

  constructor(config: MessageConfig, componentRef: ComponentRef<FuiMessage>) {
    this.config = config;
    this.componentRef = componentRef;

    this.component.onDismiss.subscribe(() => this.componentRef.destroy());
  }

  public get component(): FuiMessage {
    return this.componentRef.instance;
  }

  public onClick(callback: () => void): ActiveMessage {
    this.config.onClick.subscribe(() => callback());
    return this;
  }

  public onDismiss(callback: () => void): ActiveMessage {
    this.config.onDismiss.subscribe(() => callback());
    return this;
  }

  public dismiss(): void {
    this.component.dismiss();
  }
}
