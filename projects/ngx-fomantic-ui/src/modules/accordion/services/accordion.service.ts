import {FuiAccordionPanel} from '../components/accordion-panel';

export class FuiAccordionService {
  public closeOthers: boolean;

  public transition: string;
  public transitionDuration: number;

  public panels: FuiAccordionPanel[];

  constructor() {
    this.closeOthers = true;

    this.transition = 'fade';
    this.transitionDuration = 350;

    this.panels = [];
  }

  public addPanel(panel: FuiAccordionPanel): void {
    panel.service = this;
    this.panels.push(panel);
  }

  public closeOtherPanels(panel: FuiAccordionPanel): void {
    if (!this.closeOthers) {
      return;
    }

    this.panels.forEach(p => {
      if (p !== panel) {
        p.isOpen = false;
      }
    });
  }
}
