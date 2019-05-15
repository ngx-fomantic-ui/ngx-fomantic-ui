import {Directive, ElementRef, EventEmitter, HostBinding, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: 'input[fuiSelectSearch]'
})
export class FuiSelectSearch {
  @HostBinding('class.search')
  public readonly hasClasses: boolean;

  @HostBinding('attr.autocomplete')
  public readonly autoComplete: string;
  public onQueryUpdated: EventEmitter<string>;
  public onQueryKeyDown: EventEmitter<KeyboardEvent>;

  constructor(private _renderer: Renderer2, private _element: ElementRef) {
    this.onQueryUpdated = new EventEmitter<string>();
    this.onQueryKeyDown = new EventEmitter<KeyboardEvent>();

    this.hasClasses = true;
    this.autoComplete = 'off';
  }

  public set query(query: string) {
    this._renderer.setProperty(this._element.nativeElement, 'value', query);
  }

  @HostListener('input', ['$event.target.value'])
  public updateQuery(query: string): void {
    this.onQueryUpdated.emit(query);
  }

  @HostListener('keydown', ['$event'])
  public onKeyDown(e: KeyboardEvent): void {
    this.onQueryKeyDown.emit(e);
  }

  public focus(): void {
    // Slightly delay to support in menu search.
    this._element.nativeElement.focus();
    setTimeout(() => this._element.nativeElement.focus());
  }
}
