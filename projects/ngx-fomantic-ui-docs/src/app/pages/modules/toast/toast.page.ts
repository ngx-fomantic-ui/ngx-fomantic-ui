import { Component } from '@angular/core';
import { ApiDefinition } from '../../../components/api/api.component';
import { FuiModalService } from 'ngx-fomantic-ui';
import { AlertModal } from '../../../modals/alert.modal';

const exampleMinimalTemplate = `
    <fui-toast [dismissible]="false">
      <ng-template fuiToastMessage>I am a toast, nice to meet you!</ng-template>
    </fui-toast>
`;

const exampleTitledTemplate = `
    <fui-toast [dismissible]="false">
      <ng-template fuiToastTitle>Better!</ng-template>
      <ng-template fuiToastMessage>I am a toast, nice to meet you!</ng-template>
    </fui-toast>
`;

const exampleProgressbarTemplate = `
    <fui-toast [showProgress]="'bottom'" [displayTime]="5000">
      <ng-template fuiToastTitle>LOOK</ng-template>
      <ng-template fuiToastMessage>See, how long i will last</ng-template>
    </fui-toast>
`;

const exampleTypeTemplate = `
    <fui-toast [class]="'success'">
      <ng-template fuiToastMessage>You're using the good framework!</ng-template>
    </fui-toast>
    <br/>
    <fui-toast [class]="'error'">
      <ng-template fuiToastMessage>An error occured!</ng-template>
    </fui-toast>
    <br/>
    <fui-toast [class]="'warning'">
      <ng-template fuiToastMessage>Behind you!</ng-template>
    </fui-toast>
`;

const exampleDurationTemplate = `
    <fui-toast [displayTime]="5000">
      <ng-template fuiToastMessage>You will see me for 5 seconds.</ng-template>
    </fui-toast>
    <br/>
    <fui-toast>
      <ng-template fuiToastMessage>I'll stay here until you click on me!</ng-template>
    </fui-toast>
`;

const exampleMessageStyleTemplate = `
    <fui-toast [class]="'purple'" [className]="'ui message'">
      <ng-template fuiToastTitle>Awesome</ng-template>
      <ng-template fuiToastMessage>I got my style from the message class</ng-template>
    </fui-toast>
`;

const exampleDecreasingTemplate = `
    <fui-toast [showProgress]="'top'" [progressUp]="false" [displayTime]="5000">
      <ng-template fuiToastTitle>LOOK</ng-template>
      <ng-template fuiToastMessage>See, how long i will last</ng-template>
    </fui-toast>
`;

const exampleIconTemplate = `
    <fui-toast [class]="'warning'" [showIcon]="false">
      <ng-template fuiToastMessage>Hey, where is my icon?</ng-template>
    </fui-toast>

    <fui-toast [class]="'info'" [showIcon]="'microphone'">
      <ng-template fuiToastMessage>Listen to me</ng-template>
    </fui-toast>

    <fui-toast [class]="'info'" [displayTime]="0" [closeIcon]="true">
      <ng-template fuiToastMessage>Click on the X to close me</ng-template>
    </fui-toast>
`;

@Component({
    selector: 'demo-page-toast',
    templateUrl: './toast.page.html'
})
export class ToastPage {
    public api: ApiDefinition = [
        {
            selector: '<fui-toast>',
            properties: [
                {
                    name: 'dismissible',
                    type: 'boolean',
                    description: 'Whether the toast can be or cannot be dismissed when click on.',
                    defaultValue: 'true'
                },
                {
                    name: 'title',
                    type: 'string',
                    description: 'A title for the toast. Leave empty to not display it',
                    defaultValue: ''
                },
                {
                    name: 'message',
                    type: 'string',
                    description: 'Message to display.',
                    defaultValue: ''
                },
                {
                    name: 'class',
                    type: 'string',
                    description: 'Define the class of notification. Can be info, success, warning and error. If ui message is used in className.toast option (see below), this option can hold any supported class of the message component.',
                    defaultValue: 'info'
                },
                {
                    name: 'showIcon',
                    type: 'boolean | string',
                    description: 'Define if the toast should display an icon. If a string is given, this will be used as icon classname.',
                    defaultValue: 'true'
                },
                {
                    name: 'closeIcon',
                    type: 'boolean',
                    description: 'This will make the toast closable by the top right corner icon instead of clicking anywhere on the toast.',
                    defaultValue: 'false'
                },
                {
                    name: 'className',
                    type: 'string',
                    description: 'Class names used to attach style to state.',
                    defaultValue: ''
                },
                {
                    name: 'progressUp',
                    type: 'boolean',
                    description: 'true Increases the progressbar from 0% to 100%, false Decreases the progressbar from 100% to 0%.',
                    defaultValue: 'true'
                },
                {
                    name: 'displayTime',
                    type: 'number',
                    description: '	Set the time (in ms) of the toast appearance. Set 0 to disable the automatic dismissal',
                    defaultValue: '0'
                }
            ]
        },
        {
            selector: '[fuiToastTitle]',
        },
        {
            selector: '[fuiToastMessage]',
        }
    ];
    public exampleMinimalTemplate: string = exampleMinimalTemplate;
    public exampleTitledTemplate: string = exampleTitledTemplate;
    public exampleProgressbarTemplate: string = exampleProgressbarTemplate;
    public exampleTypeTemplate: string = exampleTypeTemplate;
    public exampleDurationTemplate: string = exampleDurationTemplate;
    public exampleMessageStyleTemplate: string = exampleMessageStyleTemplate;
    public exampleDecreasingTemplate: string = exampleDecreasingTemplate;
    public exampleIconTemplate: string = exampleIconTemplate;
}

@Component({
    selector: 'example-toast-minimal',
    template: exampleMinimalTemplate
})
export class ToastExampleMinimal {}

@Component({
    selector: 'example-toast-titled',
    template: exampleTitledTemplate
})
export class ToastExampleTitled {}

@Component({
    selector: 'example-toast-progressbar',
    template: exampleProgressbarTemplate
})
export class ToastExampleProgressbar {}

@Component({
    selector: 'example-toast-type',
    template: exampleTypeTemplate
})
export class ToastExampleType {}

@Component({
    selector: 'example-toast-duration',
    template: exampleDurationTemplate
})
export class ToastExampleDuration {}

@Component({
    selector: 'example-toast-messagestyle',
    template: exampleMessageStyleTemplate
})
export class ToastExampleMessageStyle {}

@Component({
    selector: 'example-toast-decreasing',
    template: exampleDecreasingTemplate
})
export class ToastExampleDecreasing {}

@Component({
    selector: 'example-toast-icon',
    template: exampleIconTemplate
})
export class ToastExampleIcon {}


export const ToastPageComponents = [ToastPage, ToastExampleMinimal, ToastExampleTitled, ToastExampleProgressbar, ToastExampleType, ToastExampleDuration, ToastExampleMessageStyle, ToastExampleDecreasing, ToastExampleIcon];
