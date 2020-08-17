import {Component, HostBinding, Input, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {FuiComponentFactory} from '../../../misc/util/internal';
import {IResultContext} from './search';

@Component({
  selector: 'fui-search-result',
  template: `
<span #templateSibling></span>
<span *ngIf="!template" [innerHTML]="formatter(value, query)"></span>
`
})
export class FuiSearchResult<T> {

  // Sets the Fomantic UI classes on the host element.
  @HostBinding('class.result')
  public readonly hasClasses: boolean;
  @Input()
  public value: T;
  @Input()
  public query: string;
  // Returns the label from a given value.
  @Input()
  public formatter: (obj: T, query: string) => string;
  // Placeholder to draw template beside.
  @ViewChild("templateSibling", { read: ViewContainerRef, static: true })
  public templateSibling: ViewContainerRef;

  constructor(public componentFactory: FuiComponentFactory) {
    this.hasClasses = true;

    // By default we make this function return an empty string, for the brief moment when it isn't displaying the correct label.
    this.formatter = value => '';
  }

  private _template?: TemplateRef<IResultContext<T>>;

  @Input()
  public get template(): TemplateRef<IResultContext<T>> | undefined {
    return this._template;
  }

  public set template(template: TemplateRef<IResultContext<T>> | undefined) {
    this._template = template;
    if (this.template) {
      this.componentFactory.createView(this.templateSibling, this.template, {
        $implicit: this.value,
        query: this.query
      });
    }
  }
}
