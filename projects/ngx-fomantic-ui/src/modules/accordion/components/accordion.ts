import {AfterContentInit, Component, ContentChildren, HostBinding, Input, QueryList} from '@angular/core';
import {FuiAccordionPanel} from './accordion-panel';
import {FuiAccordionService} from '../services/accordion.service';

@Component({
  selector: 'fui-accordion',
  template: `
<ng-content></ng-content>
`,
  styles: [`
/* Fix for general styling issues */
:host {
    display: block;
}

/* Fix for styled border issue */
:host.styled fui-accordion-panel:first-child .title {
    border-top: none
}
`]
})
export class FuiAccordion implements AfterContentInit {
  @HostBinding('class.ui')
  @HostBinding('class.accordion')
  public readonly hasClasses: boolean;
  protected _service: FuiAccordionService;
  @ContentChildren(FuiAccordionPanel)
  protected _panels: QueryList<FuiAccordionPanel>;

  constructor() {
    // Accordion service is unique to each set of panels.
    this._service = new FuiAccordionService();

    this.hasClasses = true;
  }

  @Input()
  public get closeOthers(): boolean {
    return this._service.closeOthers;
  }

  public set closeOthers(value: boolean) {
    this._service.closeOthers = value;
  }

  @Input()
  public set transition(transition: string) {
    this._service.transition = transition;
  }

  @Input()
  public set transitionDuration(duration: number) {
    this._service.transitionDuration = duration;
  }

  public ngAfterContentInit(): void {
    this.updatePanels();

    // Reconnect panels after they have updated.
    this._panels.changes.subscribe(() => this.updatePanels());
  }

  public updatePanels(): void {
    this._panels.forEach(p => this._service.addPanel(p));
  }
}
