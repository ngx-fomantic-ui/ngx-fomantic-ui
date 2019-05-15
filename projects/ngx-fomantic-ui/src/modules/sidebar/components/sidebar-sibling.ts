import {Component, ElementRef, HostBinding, HostListener, Input, Renderer2} from '@angular/core';
import {SidebarService, SidebarTransition} from '../services/sidebar.service';

@Component({
  selector: 'fui-sidebar-sibling',
  template: `
                   <ng-content></ng-content>`,
  styles: [`
                   :host {
                       display: block;
                   }
               `]
})
export class FuiSidebarSibling {

  @Input()
  public isDimmedWhenVisible: boolean;
  @HostBinding('class.pusher')
  public readonly hasClasses: boolean;
  @Input()
  public canCloseSidebar = true;

  constructor(private _renderer: Renderer2, private _element: ElementRef) {
    this.isDimmedWhenVisible = false;

    this.hasClasses = true;
  }

  @HostBinding('class.visible')
  public get isVisible(): boolean {
    if (!this.service) {
      return false;
    }
    return this.service.isVisible;
  }

  @HostBinding('class.dimmed')
  public get isDimmed(): boolean {
    if (!this.service) {
      return false;
    }
    return this.service.isVisible && this.isDimmedWhenVisible;
  }

  private _service: SidebarService;

  public get service(): SidebarService {
    return this._service;
  }

  public set service(service: SidebarService) {
    this._service = service;

    setTimeout(() => this.updateTransform());
    this._service.isVisibleChange.subscribe(() => this.updateTransform());
  }

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent): void {
    if (this.canCloseSidebar && this.service.isVisible && !this.service.wasJustOpened) {
      this.service.setVisibleState(false);
    }
  }

  private updateTransform(): void {
    this._renderer.removeStyle(this._element.nativeElement, 'transform');
    this._renderer.removeStyle(this._element.nativeElement, '-webkit-transform');

    if (this.service.isVisible &&
      this.service.transition !== SidebarTransition.Overlay &&
      this.service.transition !== SidebarTransition.ScaleDown) {

      const translate = `translate3d(${this.service.width}px, ${this.service.height}px, 0)`;
      this._renderer.setStyle(this._element.nativeElement, 'transform', translate);
      this._renderer.setStyle(this._element.nativeElement, '-webkit-transform', translate);
    }
  }
}
