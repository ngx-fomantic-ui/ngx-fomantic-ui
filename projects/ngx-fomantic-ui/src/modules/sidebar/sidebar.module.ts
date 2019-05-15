import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FuiSidebar} from './components/sidebar';
import {FuiSidebarContainer} from './components/sidebar-container';
import {FuiSidebarSibling} from './components/sidebar-sibling';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FuiSidebar,
    FuiSidebarContainer,
    FuiSidebarSibling
  ],
  exports: [
    FuiSidebar,
    FuiSidebarContainer,
    FuiSidebarSibling
  ]
})
export class FuiSidebarModule {
}
