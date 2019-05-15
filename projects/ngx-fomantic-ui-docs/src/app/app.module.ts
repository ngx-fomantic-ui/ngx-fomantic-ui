import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FuiPopupModule, FuiSidebarModule} from 'ngx-fomantic-ui';

import {DemoRoutingModule} from './app.routing';
import {DemoComponentsModule} from './components/demo-components.module';
import {DemoModalsModule} from './modals/demo-modals.module';
import {DemoPagesModule} from './pages/demo-pages.module';

import {AppComponent} from './app.component';

import css from 'highlight.js/lib/languages/css';
import bash from 'highlight.js/lib/languages/bash';
import typescript from 'highlight.js/lib/languages/typescript';
import {HIGHLIGHT_OPTIONS, HighlightModule} from 'ngx-highlightjs';

export function hljsLanguages() {
  return [
    {name: 'typescript', func: typescript},
    {name: 'bash', func: bash},
    {name: 'markup', func: css}
  ];
}

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,

    HighlightModule,

    FuiSidebarModule,
    FuiPopupModule,

    DemoRoutingModule,
    DemoComponentsModule,
    DemoModalsModule,
    DemoPagesModule
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        languages: hljsLanguages
      }
    }
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
