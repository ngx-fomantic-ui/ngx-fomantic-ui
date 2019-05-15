import {MessageConfig} from './message-config';
import {FuiActiveMessage} from './active-message';
import {FuiMessageContainer} from '../components/message-container';

export interface IMessageController {
  maxShown: number;
  isNewestOnTop: boolean;

  show(config: MessageConfig): FuiActiveMessage;

  dismissAll(): void;
}

export class MessageController implements IMessageController {
  public maxShown: number;
  public isNewestOnTop: boolean;
  private _container: FuiMessageContainer;

  constructor() {
    this.maxShown = 7;
    this.isNewestOnTop = true;
  }

  public registerContainer(container: FuiMessageContainer): void {
    this._container = container;
  }

  public show(config: MessageConfig): FuiActiveMessage {
    this.throwContainerError();

    return this._container.show(config, this.maxShown, this.isNewestOnTop);
  }

  public dismissAll(): void {
    this.throwContainerError();

    return this._container.dismissAll();
  }

  private throwContainerError(): void {
    if (!this._container) {
      throw new Error('You must pass this controller to a message container.');
    }
  }
}
