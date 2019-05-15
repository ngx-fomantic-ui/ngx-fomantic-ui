import { Component } from '@angular/core';
import { FuiPopupConfig } from 'ngx-fomantic-ui';

@Component({
    selector: 'demo-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(popupConfig: FuiPopupConfig) {
        popupConfig.isInverted = true;
        popupConfig.delay = 300;
    }
}
