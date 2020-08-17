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
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          xml: () => import('highlight.js/lib/languages/xml'),
          typescript: () => import('highlight.js/lib/languages/typescript'),
          javascript: () => import('highlight.js/lib/languages/javascript'),
          bash: () => import('highlight.js/lib/languages/bash'),
          markup: () => import('highlight.js/lib/languages/css')
        }
      }
    }
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
