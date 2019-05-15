import { Component } from '@angular/core';
import { Transition, TransitionController, TransitionDirection } from 'ngx-fomantic-ui';
import { ApiDefinition } from '../../../components/api/api.component';

const exampleStandardTemplate = `
<div class="ui segment">
    <img src="https://goo.gl/VUcnwx" class="ui image" [fuiTransition]="transitionController">
</div>
<fui-select class="selection" [(ngModel)]="transitionName" [options]="transitions" [isSearchable]="true" #animSelect>
    <fui-select-option *ngFor="let a of animSelect.availableOptions" [value]="a"></fui-select-option>
</fui-select>
<button class="ui button" (click)="animate(transitionName)">Animate</button>
`;

@Component({
    selector: 'demo-page-transition',
    templateUrl: './transition.page.html'
})
export class TransitionPage {
    public api: ApiDefinition = [
        {
            selector: '[fuiTransition]',
            properties: [
                {
                    name: 'fuiTransition',
                    type: 'TransitionController',
                    description: 'Sets the transition controller.',
                    required: true
                }
            ]
        }
    ];

    public transitionControllerCode = `
import {TransitionController} from "ngx-fomantic-ui";

@Component({})
export class MyComponent {
    public transitionController = new TransitionController();
}
`;

    public transitionElementCode = `
<div class="ui segment">
    <img src="https://goo.gl/VUcnwx" class="ui image" [fuiTransition]="transitionController">
</div>
`;

    public transitionExampleCode = `
import {TransitionController, Transition, TransitionDirection} from "ngx-fomantic-ui";

@Component({})
export class MyComponent {
    public transitionController = new TransitionController();

    public animate(transitionName:string = "scale") {
        this.transitionController.animate(
            new Transition(transitionName, 500, TransitionDirection.In, () => console.log("Completed transition.")));
    }
}
`;

    public exampleStandardTemplate: string = exampleStandardTemplate;

    public transitionControllerInterface = `
this.ctrl = new TransitionController(isInitiallyVisible:boolean = false, display:string = "block");
// isInitiallyVisible sets whether the element being animated starts off visible.
// display sets the 'display' style set on the animated element when it is visible.

this.ctrl.animate(transition:Transition);
// Adds a transition to the queue.

/* Example */
const t = new Transition(
    name:string, // Name of the transition. See the above select for the available options.
    duration:number = 250, // Duration of the transition in milliseconds.
    direction:TransitionDirection = TransitionDirection.Either, // Transition direction (In, Out, Either, Static).
    onComplete:(() => void) = () => {}) // Callback function run when the transition has completed.

this.ctrl.animate(t);

this.ctrl.stop(transition?:Transition);
// Stops the current or provided transition, but continues with the queued transitions.

this.ctrl.stopAll();
// Stops the current transition, and empties the queue.

this.ctrl.clearQueue();
// Continues with the current transition, but empties the queue.
`;

    public advancedExampleCode = `
import {FuiTransition, TransitionController, Transition} from "ngx-fomantic-ui";

@Component({})
export class MyComponent extends FuiTransition {
    private _transitionController:TransitionController;

    constructor(renderer:Renderer2, element:ElementRef, changeDetector:ChangeDetectorRef) {
        super(renderer, element, changeDetector);

        this._transitionController = new TransitionController(false);
        this.setTransitionController(this._transitionController);
        // setTransitionController is a method inherited from FuiTransition.
    }

    public exampleMethod() {
        // You can now animate the host element using the transition controller:
        this._transitionController.animate(new Transition(...));
    }
}
`;
}

@Component({
    selector: 'example-transition-standard',
    template: exampleStandardTemplate
})
export class TransitionExampleStandard {
    public transitionController: TransitionController = new TransitionController();

    public transitions: string[] = [
        'scale', 'fade', 'fade up', 'fade down',
        'fade left', 'fade right', 'horizontal flip', 'vertical flip',
        'drop', 'fly left', 'fly right', 'fly up',
        'fly down', 'swing left', 'swing right', 'swing up',
        'swing down', 'browse', 'browse right', 'slide left',
        'slide right', 'slide up', 'slide down', 'jiggle',
        'flash', 'shake', 'pulse', 'tada', 'bounce'
    ];

    public transitionName = 'scale';

    public animate(transitionName: string = 'scale'): void {
        this.transitionController.animate(
            new Transition(transitionName, 500, TransitionDirection.Either, () => console.log('Completed transition.')));
    }
}

export const TransitionPageComponents = [TransitionPage, TransitionExampleStandard];
