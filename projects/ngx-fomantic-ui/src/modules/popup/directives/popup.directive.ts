import {Directive, ElementRef, Input, Renderer2, TemplateRef} from '@angular/core';
import {PositioningPlacement, FuiComponentFactory, Util} from '../../../misc/util/internal';
import {PopupConfig, PopupSize, PopupTrigger, PopupWidth} from '../classes/popup-config';
import {FuiPopupConfig} from '../services/popup.service';
import {ITemplatePopupConfig, ITemplatePopupContext, FuiPopupTemplateController} from '../classes/popup-template-controller';

const templateRef = TemplateRef;

@Directive({
  selector: '[fuiPopup]',
  exportAs: 'fuiPopup'
})
export class FuiPopupDirective<T> extends FuiPopupTemplateController<T> {
  constructor(renderer: Renderer2,
              element: ElementRef,
              componentFactory: FuiComponentFactory,
              popupDefaults: FuiPopupConfig) {

    super(renderer, element, componentFactory, new PopupConfig(popupDefaults));
  }

  @Input()
  public set popupHeader(header: string) {
    this.popup.config.header = header;
  }

  @Input()
  public set popupText(text: string) {
    this.popup.config.text = text;
  }

  @Input()
  public set popupInverted(inverted: boolean) {
    this.popup.config.isInverted = Util.DOM.parseBooleanAttribute(inverted);
  }

  @Input()
  public set popupBasic(basic: boolean) {
    this.popup.config.isBasic = Util.DOM.parseBooleanAttribute(basic);
  }

  @Input()
  public set popupInline(inline: boolean) {
    this.popup.config.isInline = Util.DOM.parseBooleanAttribute(inline);
  }

  @Input()
  public set popupFlowing(flowing: boolean) {
    this.popup.config.isFlowing = Util.DOM.parseBooleanAttribute(flowing);
  }

  @Input()
  public set popupTransition(transition: string) {
    this.popup.config.transition = transition;
  }

  @Input()
  public set popupTransitionDuration(duration: number) {
    this.popup.config.transitionDuration = duration;
  }

  @Input()
  public set popupPlacement(placement: PositioningPlacement) {
    this.popup.config.placement = placement;
  }

  @Input()
  public set popupWidth(width: PopupWidth) {
    this.popup.config.width = width;
  }

  @Input()
  public set popupSize(size: PopupSize) {
    this.popup.config.size = size;
  }

  @Input()
  public set popupDelay(delay: number) {
    this.popup.config.delay = delay;
  }

  @Input()
  public get popupTrigger(): PopupTrigger {
    return this.popup.config.trigger;
  }

  public set popupTrigger(trigger: PopupTrigger) {
    this.popup.config.trigger = trigger;
  }

  @Input()
  public set popupTemplate(template: TemplateRef<ITemplatePopupContext<T>> | undefined) {
    this.template = template;
  }

  @Input()
  public set popupTemplateContext(context: T | undefined) {
    this.context = context;
  }

  @Input()
  public set popupConfig(config: ITemplatePopupConfig<T> | undefined) {
    this.configure(config);
  }
}
