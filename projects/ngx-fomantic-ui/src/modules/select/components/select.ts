import {Component, Directive, ElementRef, EventEmitter, Input, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {CustomValueAccessor, customValueAccessorFactory, HandledEvent, ICustomValueAccessorHost} from '../../../misc/util/internal';
import {FuiLocalizationService} from '../../../behaviors/localization/internal';
import {FuiSelectBase} from '../classes/select-base';
import {FuiSelectOption} from './select-option';

@Component({
  selector: 'fui-select',
  template: `
                   <!-- Query input -->
                   <input fuiSelectSearch
                          type="text"
                          [hidden]="!isSearchable || isSearchExternal">

                   <!-- Placeholder text -->
                   <div *ngIf="selectedOption == undefined" class="default text" [class.filtered]="query">{{ placeholder }}</div>
                   <!-- Selected item -->
                   <div class="text" [class.filtered]="query || selectedOption == undefined">
                       <span #optionTemplateSibling></span>
                       <span *ngIf="!optionTemplate && selectedOption != undefined"
                             [innerHTML]="configuredFormatter(selectedOption)"></span>
                   </div>
                   <!-- Dropdown icon -->
                   <i *ngIf="selectedOption && !isSearching && isClearable" class="times icon"
                      (click)="onRemoveClick($event)"></i>
                   <i *ngIf="!selectedOption || !isClearable" class="{{ icon }} icon" (click)="onCaretClick($event)"></i>
                   <!-- Select dropdown menu -->
                   <div class="menu"
                        fuiDropdownMenu
                        [menuTransition]="transition"
                        [menuTransitionDuration]="transitionDuration"
                        [menuAutoSelectFirst]="isSearchable">

                       <ng-content></ng-content>
                       <div *ngIf="isSearchable && availableOptions.length === 0" class="message">
                           {{ localeValues.noResultsMessage }}
                       </div>
                   </div>
               `,
  styles: [`
                   :host .times.icon {
                       position: absolute;
                       width: auto;
                       height: auto;
                       line-height: 1.21428571em;
                       top: .78571429em;
                       right: 1em;
                       margin: -.78571429em;
                       opacity: .6;
                       font-size: 1.07142857em;
                       padding: .6em;
                       -webkit-transition: opacity .1s ease;
                       transition: opacity .1s ease;
                       z-index: 3;
                   }

                   :host .times.icon.larger {
                       padding: .91666667em;
                       font-size: .85714286em;
                   }

                   :host .times.icon:hover {
                       opacity: 1;
                   }
               `]
})
export class FuiSelect<T, U> extends FuiSelectBase<T, U> implements ICustomValueAccessorHost<U> {

  public selectedOption?: T;
  @Output()
  public selectedOptionChange: EventEmitter<U>;
  // Stores the value written by ngModel before it can be matched to an option from `options`.
  private _writtenOption?: U;
  @ViewChild('optionTemplateSibling', {read: ViewContainerRef, static: true})
  private _optionTemplateSibling: ViewContainerRef;

  constructor(element: ElementRef, localizationService: FuiLocalizationService) {
    super(element, localizationService);

    this.selectedOptionChange = new EventEmitter<U>();
  }

  private _placeholder: string;

  @Input()
  public get placeholder(): string {
    return this._placeholder || this.localeValues.single.placeholder;
  }

  public set placeholder(placeholder: string) {
    this._placeholder = placeholder;
  }

  public selectOption(option: T): void {
    // Choose and emit the selected option.
    this.selectedOption = option;
    this.selectedOptionChange.emit(this.valueGetter(option));

    this.dropdownService.setOpenState(false);

    this.resetQuery();

    this.drawSelectedOption();

    // Automatically refocus the search input for better keyboard accessibility.
    this.focus();
  }

  public writeValue(value: U): void {
    if (value != undefined) {
      if (this.searchService.options.length > 0) {
        // If the options have already been loaded, we can immediately match the ngModel value to an option.
        this.selectedOption = this.findOption(this.searchService.options, value);

        this.drawSelectedOption();
      }
      if (this.selectedOption == undefined) {
        if (this.valueField && this.searchService.hasItemLookup) {
          // If the search service has a selected lookup function, make use of that to load the initial value.
          this.searchService
            .initialLookup(value)
            .then(i => {
              this.selectedOption = i;
              this.drawSelectedOption();
            });
        } else {
          // Otherwise, cache the written value for when options are set.
          this._writtenOption = value;
        }
      }
    } else {
      this.selectedOption = undefined;
      this.drawSelectedOption();
    }
  }

  public onRemoveClick(e: HandledEvent): void {
    if (!e.eventHandled) {
      e.eventHandled = true;
      this.selectedOption = undefined;
      this.selectedOptionChange.emit(undefined);
      this._renderedOptions.forEach(o => o.isActive = false);
    }
  }

  protected optionsUpdateHook(): void {
    if (!this._writtenOption && this.selectedOption) {
      // We need to check the option still exists.
      this.writeValue(this.valueGetter(this.selectedOption));
    }

    if (this._writtenOption && this.searchService.options.length > 0) {
      // If there was an value written by ngModel before the options had been loaded, this runs to fix it.
      this.selectedOption = this.findOption(this.searchService.options, this._writtenOption);
      if (this.selectedOption) {
        this._writtenOption = undefined;
        this.drawSelectedOption();
      }
    }
  }

  protected queryUpdateHook(): void {
    // When the query is updated, we just abandon the current selection.
    this.selectedOption = undefined;
  }

  protected initialiseRenderedOption(option: FuiSelectOption<T>): void {
    super.initialiseRenderedOption(option);

    // Boldens the item so it appears selected in the dropdown.
    option.isActive = option.value === this.selectedOption;
  }

  private drawSelectedOption(): void {
    // Updates the active class on the newly selected option.
    if (this._renderedOptions) {
      this.onAvailableOptionsRendered();
    }

    if (this.selectedOption != undefined && this.optionTemplate) {
      this.drawTemplate(this._optionTemplateSibling, this.selectedOption);
    }
  }
}

// Value accessor directive for the select to support ngModel.
@Directive({
  selector: 'fui-select',
  host: {
    '(selectedOptionChange)': 'onChange($event)',
    '(touched)': 'onTouched()'
  },
  providers: [customValueAccessorFactory(FuiSelectValueAccessor)]
})
export class FuiSelectValueAccessor<T, U> extends CustomValueAccessor<U, FuiSelect<T, U>> {
  constructor(host: FuiSelect<T, U>) {
    super(host);
  }
}
