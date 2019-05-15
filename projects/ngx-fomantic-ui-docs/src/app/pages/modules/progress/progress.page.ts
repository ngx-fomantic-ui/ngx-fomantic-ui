import { Component } from '@angular/core';
import { ApiDefinition } from '../../../components/api/api.component';

const exampleStandardTemplate = `
<div class="ui segment">
    <fui-progress [value]="value" [showProgress]="progress" [maximum]="maximum" [precision]="precision">
        Progress Bar Label
    </fui-progress>

    <div class="ui small form">
        <div class="four fields">
            <div class="field">
                <label>Value</label>
                <div class="ui action input">
                    <input type="number" [(ngModel)]="value">

                    <button class="ui green icon button" (click)="value = value + 10">
                        <i class="plus icon"></i>
                    </button>
                    <button class="ui red icon button" (click)="value = value - 10">
                        <i class="minus icon"></i>
                    </button>
                </div>
            </div>
            <div class="field">
                <label>Maximum</label>
                <input type="number" [(ngModel)]="maximum">
            </div>
            <div class="field">
                <label>Precision</label>
                <input type="number" [(ngModel)]="precision">
            </div>
        </div>
        <div class="field">
            <fui-checkbox [(ngModel)]="progress">Show Progress?</fui-checkbox>
        </div>
    </div>
</div>
`;

const exampleVariationsTemplate = `
<div class="ui segment">
    <fui-progress class="top attached purple active" [value]="changingValue" [autoSuccess]="false"></fui-progress>
    <fui-progress class="indicating" [value]="changingValue">Indicating</fui-progress>
    <fui-progress class="active" [value]="changingValue">Active</fui-progress>
    <fui-progress class="warning" [value]="changingValue">Warning</fui-progress>
    <fui-progress class="error" [value]="changingValue">Error</fui-progress>
    <fui-progress class="disabled" [value]="randomValue">Disabled</fui-progress>
    <fui-progress class="tiny" [value]="changingValue">Tiny (autohides progress)</fui-progress>
    <fui-progress class="bottom attached indicating active" [value]="changingValue"></fui-progress>
</div>
`;

@Component({
    selector: 'demo-page-progress',
    templateUrl: './progress.page.html'
})
export class ProgressPage {
    public api: ApiDefinition = [
        {
            selector: '<fui-progress>',
            properties: [
                {
                    name: 'value',
                    type: 'number',
                    description: 'Sets whether or not the element is collapsed. ' +
                                 'Values not in <code>[0, ..., maximum]</code> are automatically bounded.',
                    defaultValue: '0'
                },
                {
                    name: 'maximum',
                    type: 'number',
                    description: 'Sets the maximum value. When <code>value > maximum</code> the progress bar is full. ' +
                                 'Use the 1st example to try out this functionality.',
                    defaultValue: '100'
                },
                {
                    name: 'precision',
                    type: 'number',
                    description: 'Sets the number of decimal places on the current progress label.',
                    defaultValue: '0'
                },
                {
                    name: 'showProgress',
                    type: 'boolean',
                    description: 'Whether or not the current progress label is displayed.',
                    defaultValue: 'true'
                },
                {
                    name: 'autoSuccess',
                    type: 'boolean',
                    description: 'Sets whether or not the progress bar automatically turns green when <code>value == maximum</code>.',
                    defaultValue: 'true'
                },
                {
                    name: 'transition',
                    type: 'number',
                    description: 'Sets the transition function used when transitioning between values.',
                    defaultValue: '350'
                },
                {
                    name: 'transitionDuration',
                    type: 'number',
                    description: 'Sets the transition duration of the bar between values.',
                    defaultValue: '350'
                },
                {
                    name: 'canCompletelyEmpty',
                    type: 'boolean',
                    description: 'Sets whether the progress bar can empty completely.',
                    defaultValue: 'false'
                }
            ]
        }
    ];
    public exampleStandardTemplate: string = exampleStandardTemplate;
    public exampleVariationsTemplate: string = exampleVariationsTemplate;
}

@Component({
    selector: 'example-progress-standard',
    template: exampleStandardTemplate
})
export class ProgressExampleStandard {
    public value = 55;
    public progress = true;
    public maximum = 100;
    public precision = 0;
}

@Component({
    selector: 'example-progress-variations',
    template: exampleVariationsTemplate
})
export class ProgressExampleVariations {
    public value = 55;

    public changingValue = -20;
    public randomValue = 0;

    constructor() {
        this.updateChangingValue();
        this.randomValue = Math.floor(Math.random() * 100) + 1;
    }

    private updateChangingValue(): void {
        setTimeout(
            () => {
                if (this.changingValue > 120) {
                    this.changingValue = -20;
                } else {
                    this.changingValue += 2;
                }
                this.updateChangingValue();
            },
            75
        );
    }
}

export const ProgressPageComponents = [ProgressPage, ProgressExampleStandard, ProgressExampleVariations];
