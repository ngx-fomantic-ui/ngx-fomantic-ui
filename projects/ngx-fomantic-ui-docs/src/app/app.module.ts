import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuiPopupModule, FuiSidebarModule } from 'ngx-fomantic-ui';

import { DemoRoutingModule } from './app.routing';
import { DemoComponentsModule } from './components/demo-components.module';
import { DemoModalsModule } from './modals/demo-modals.module';
import { DemoPagesModule } from './pages/demo-pages.module';

import { AppComponent } from './app.component';

import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';

export function loadHighlightLibCore() {
  return import('highlight.js/lib/core');
}

export function xmlLang() {
  return import('highlight.js/lib/languages/xml')
}


export function typescriptLang() {
  return import('highlight.js/lib/languages/typescript')
}


export function javascriptLang() {
  return import('highlight.js/lib/languages/javascript')
}


export function bashLang() {
  return import('highlight.js/lib/languages/bash')
}

export function cssLang() {
  return import('highlight.js/lib/languages/css')
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
        coreLibraryLoader: loadHighlightLibCore,
        languages: {
          xml: xmlLang,
          typescript: typescriptLang,
          javascript: javascriptLang,
          bash: bashLang,
          markup: cssLang
        }
      }
    }
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
