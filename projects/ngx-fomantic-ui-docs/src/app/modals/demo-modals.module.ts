import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuiModalModule } from 'ngx-fomantic-ui';
import { AlertModalComponent } from './alert.modal';
import { ConfirmModalComponent } from './confirm.modal';

@NgModule({
    imports: [
        CommonModule,

        FuiModalModule
    ],
    declarations: [
        AlertModalComponent,
        ConfirmModalComponent
    ],
    exports: [
        AlertModalComponent,
        ConfirmModalComponent
    ],
    entryComponents: [
        AlertModalComponent,
        ConfirmModalComponent
    ]
})
export class DemoModalsModule {}
