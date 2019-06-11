import {AfterContentInit, Component, ContentChild, HostBinding} from '@angular/core';
import {SidebarService} from '../services/sidebar.service';
import {FuiSidebar} from './sidebar';
import {FuiSidebarSibling} from './sidebar-sibling';

@Component({
  selector: 'fui-sidebar-container',
  template: `<ng-content></ng-content>`,
  styles: [`
:host {
    display: block;
}
`]
})
export class FuiSidebarContainer implements AfterContentInit {
  public service: SidebarService;

  @HostBinding('class.pushable')
  public readonly hasClasses: boolean;

  @ContentChild(FuiSidebar, {static: false})
  public sidebar: FuiSidebar;

  @ContentChild(FuiSidebarSibling, {static: false})
  public sibling: FuiSidebarSibling;

  constructor() {
    this.hasClasses = true;
  }

  public ngAfterContentInit(): void {
    if (!this.sidebar) {
      throw new Error('You must include a <fui-sidebar> element within the container.');
    }
    this.service = this.sidebar.service;

    if (!this.sibling) {
      throw new Error('You must include a <fui-sidebar-sibling> element within the container.');
    }
    this.sibling.service = this.service;
  }
}
