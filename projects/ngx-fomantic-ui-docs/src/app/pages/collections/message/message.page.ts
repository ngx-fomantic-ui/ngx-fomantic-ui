import { Component } from '@angular/core';
import { ApiDefinition } from '../../../components/api/api.component';
import { MessageState, MessagePosition, MessageConfig, MessageController, FuiMessageService } from 'ngx-fomantic-ui';

const exampleStandardTemplate = `
<fui-message class="success">
    <div class="header">
        This is a message!
    </div>
    <p>This message can be styled (as shown) and dismissed with the close icon in the top right.</p>
</fui-message>
`;

const exampleNoDismissTemplate = `
<fui-message class="attached warning" [hasDismissButton]="false">
    <div class="header">
        Attached message!
    </div>
    <p>This message isn't dismissible.</p>
</fui-message>
<div class="ui bottom attached segment">
    <p>Example content</p>
</div>
`;

const exampleIconTemplate = `
<fui-message class="icon">
    <i class="inbox icon"></i>
    <div class="content">
        <div class="header">
            This is a message with an icon
        </div>
        <p>This message shows an icon.</p>
    </div>
</fui-message>
`;

@Component({
    selector: 'demo-page-message',
    templateUrl: './message.page.html'
})
export class MessagePage {
    public controller: MessageController;
    public api: ApiDefinition = [
        {
            selector: '<fui-message>',
            properties: [
                {
                    name: 'hasDismissButton',
                    type: 'boolean',
                    description: 'Sets whether or not the message has a dismiss button.',
                    defaultValue: 'true'
                },
                {
                    name: 'transition',
                    type: 'string',
                    description: 'Sets the transition used when dismissing the message.',
                    defaultValue: 'fade'
                },
                {
                    name: 'transitionDuration',
                    type: 'number',
                    description: 'Sets the duration for the message transition.',
                    defaultValue: '300'
                }
            ],
            events: [
                {
                    name: 'dismiss',
                    type: 'void',
                    description: 'Fires when the message is dismissed by the user.'
                }
            ]
        }
    ];
    public exampleStandardTemplate: string = exampleStandardTemplate;
    public exampleNoDismissTemplate: string = exampleNoDismissTemplate;
    public exampleIconTemplate: string = exampleIconTemplate;

    public notificationMarkup = `
<fui-message-container [controller]="controller"></fui-message-container>

<button class="ui button" (click)="open()">Open notification</button>`;

    public notificationMarkup2 = `
constructor(private _messageService:FuiMessageService) {
    this.controller = new MessageController();
    this._messageService.position = MessagePosition.BottomRight;
    this._messageService.isNewestOnTop = true;
}

public open():void {
    const message = new MessageConfig(Date.now().toString(), MessageState.Default, "Header");
    message.hasProgress = true;
    this.controller.show(message);
    this._messageService.show(message);
}`;

    public manualDismissMarkup = `
<fui-message #message>
    <div class="header">
        Dismiss Manually
    </div>
</fui-message>

<button (click)="message.dismiss()">Dismiss</button>
<button (click)="dismiss(message)">Dismiss (advanced)</button>
`;

    public manualDismissCode = `
import {IMessage} from "ngx-fomantic-ui";

@Component({})
export class MyComponent {
    public dismiss(message:IMessage) {
        message.dismiss();
    }
}
`;
    public headerInput: string;
    public messageInput: string;

    constructor(private messageService: FuiMessageService) {
        this.controller = new MessageController();
        this.messageService.position = MessagePosition.BottomRight;
        this.messageService.isNewestOnTop = true;
    }

    public open(): void {
        const message = new MessageConfig(Date.now().toString(), MessageState.Default, 'Header');
        message.hasProgress = true;
        this.controller.show(message);
        this.messageService.show(message);
    }

    public openCustom(): void {
        const message = new MessageConfig(this.messageInput, MessageState.Default, this.headerInput);
        message.hasProgress = true;
        this.controller.show(message);
        this.messageService.show(message);
    }
}

@Component({
    selector: 'example-message-standard',
    template: exampleStandardTemplate
})
export class MessageExampleStandard {}

@Component({
    selector: 'example-message-no-dismiss',
    template: exampleNoDismissTemplate
})
export class MessageExampleNoDismiss {}

@Component({
    selector: 'example-message-icon',
    template: exampleIconTemplate
})
export class MessageExampleIcon {}

export const MessagePageComponents = [MessagePage, MessageExampleStandard, MessageExampleNoDismiss, MessageExampleIcon];
