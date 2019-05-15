import {ComponentRef, Injectable} from '@angular/core';
import {FuiComponentFactory} from '../../../misc/util/internal';
import {MessagePosition, FuiMessageGlobalContainer} from '../components/message-global-container';
import {IMessageController, MessageController} from '../classes/message-controller';
import {MessageConfig} from '../classes/message-config';
import {FuiActiveMessage} from '../classes/active-message';

@Injectable()
export class FuiMessageService implements IMessageController {
  private _controller: MessageController;
  private _containerRef: ComponentRef<FuiMessageGlobalContainer>;

  constructor(private _componentFactory: FuiComponentFactory) {
    this._controller = new MessageController();

    this._containerRef = this._componentFactory.createComponent(FuiMessageGlobalContainer);
    this._container.controller = this._controller;

    this._componentFactory.attachToApplication(this._containerRef);
    this._componentFactory.moveToDocumentBody(this._containerRef);

    this.position = MessagePosition.TopRight;
    this.width = 480;
  }

  public get position(): MessagePosition {
    return this._container.position;
  }

  public set position(position: MessagePosition) {
    this._container.position = position;
  }

  public get width(): number {
    return this._container.width;
  }

  public set width(width: number) {
    this._container.width = width;
  }

  public get maxShown(): number {
    return this._controller.maxShown;
  }

  public set maxShown(max: number) {
    this._controller.maxShown = max;
  }

  public get isNewestOnTop(): boolean {
    return this._controller.isNewestOnTop;
  }

  public set isNewestOnTop(value: boolean) {
    this._controller.isNewestOnTop = value;
  }

  private get _container(): FuiMessageGlobalContainer {
    return this._containerRef.instance;
  }

  public show(config: MessageConfig): FuiActiveMessage {
    return this._controller.show(config);
  }

  public dismissAll(): void {
    return this._controller.dismissAll();
  }
}
