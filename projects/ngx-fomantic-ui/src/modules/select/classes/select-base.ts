import {
  AfterContentInit,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Subscription} from 'rxjs';
import {DropdownService, FuiDropdownMenu} from '../../dropdown/internal';
import {FilterFn, LookupFn, SearchService} from '../../search/internal';
import {HandledEvent, IFocusEvent, ITemplateRefContext, KeyCode, Util} from '../../../misc/util/internal';
import {ISelectLocaleValues, RecursivePartial, FuiLocalizationService} from '../../../behaviors/localization/internal';
import {FuiSelectOption} from '../components/select-option';
import {FuiSelectSearch} from '../directives/select-search';

export interface IOptionContext<T> extends ITemplateRefContext<T> {
  query?: string;
}

// We use generic type T to specify the type of the options we are working with,
// and U to specify the type of the property of the option used as the value.
export abstract class FuiSelectBase<T, U> implements AfterContentInit, OnDestroy {

  public dropdownService: DropdownService;
  public searchService: SearchService<T, U>;
  // Sets the Fomantic UI classes on the host element.
  @HostBinding('class.ui')
  @HostBinding('class.dropdown')
  public readonly hasClasses: boolean;
  @Input()
  public isClearable: boolean;
  @Input()
  public isSearchable: boolean;
  public isSearchExternal: boolean;
  @Input()
  public valueField: string;
  @Input()
  public optionTemplate: TemplateRef<IOptionContext<T>>;
  public localeOverrides: RecursivePartial<ISelectLocaleValues>;
  @Input()
  public icon: string;
  @Input()
  public transition: string;
  @Input()
  public transitionDuration: number;
  @Output('touched')
  public onTouched: EventEmitter<void>;
  @ViewChild(FuiDropdownMenu, {static: false})
  protected _menu: FuiDropdownMenu;
  // Keep track of all of the rendered select options. (Rendered by the user using *ngFor).
  @ContentChildren(FuiSelectOption, {descendants: true})
  protected _renderedOptions: QueryList<FuiSelectOption<T>>;
  // Keep track of all of the subscriptions to the selected events on the rendered options.
  private _renderedSubscriptions: Subscription[];
  @ViewChild(FuiSelectSearch, {static: false})
  private _internalSearch?: FuiSelectSearch;
  @ContentChild(FuiSelectSearch, {static: false})
  private _manualSearch?: FuiSelectSearch;
  @Input('tabindex')
  private _tabIndex?: number;

  constructor(private _element: ElementRef, protected _localizationService: FuiLocalizationService) {
    this.dropdownService = new DropdownService();
    // We do want an empty query to return all results.
    this.searchService = new SearchService<T, U>(true);

    this.isSearchable = false;

    this.onLocaleUpdate();
    this._localizationService.onLanguageUpdate.subscribe(() => this.onLocaleUpdate());
    this._renderedSubscriptions = [];

    this.icon = 'dropdown';
    this.transition = 'slide down';
    this.transitionDuration = 200;

    this.onTouched = new EventEmitter<void>();

    this.hasClasses = true;
  }

  @HostBinding('class.active')
  public get isActive(): boolean {
    return this.dropdownService.isOpen;
  }

  @HostBinding('class.visible')
  public get isVisible(): boolean {
    return this._menu.isVisible;
  }

  @HostBinding('class.search')
  public get hasSearchClass(): boolean {
    return this.isSearchable && !this.isSearchExternal;
  }

  @HostBinding('class.loading')
  public get isSearching(): boolean {
    return this.searchService.isSearching;
  }

  @HostBinding('class.clearable')
  public get isClearing(): boolean {
    return this.isClearable;
  }

  public get searchInput(): FuiSelectSearch | undefined {
    return this._manualSearch || this._internalSearch;
  }

  @HostBinding('attr.tabindex')
  public get tabindex(): number {
    if (this.isDisabled) {
      // If disabled, remove from tabindex.
      return -1;
    }
    if (this.dropdownService.isOpen && this.isSearchExternal) {
      // If open & in menu search, remove from tabindex (as input always autofocusses).
      return -1;
    }
    if (this._tabIndex != undefined) {
      // If custom tabindex, default to that.
      return this._tabIndex;
    }
    if (this.hasSearchClass) {
      // If search input enabled, tab goes to input.
      return -1;
    }
    // Otherwise, return default of 0.
    return 0;
  }

  @HostBinding('class.disabled')
  @Input()
  public get isDisabled(): boolean {
    return this.dropdownService.isDisabled;
  }

  public set isDisabled(value: boolean) {
    this.dropdownService.isDisabled = !!value;
  }

  @Input()
  public set options(options: T[]) {
    if (options) {
      this.searchService.options = options;

      this.optionsUpdateHook();
    }
  }

  @Input()
  public set optionsFilter(filter: FilterFn<T> | undefined) {
    if (filter) {
      this.searchService.optionsFilter = filter;

      this.optionsUpdateHook();
    }
  }

  @Input()
  public set optionsLookup(lookup: LookupFn<T, U> | undefined) {
    if (lookup) {
      this.searchService.optionsLookup = lookup;

      this.optionsUpdateHook();
    }
  }

  public get filteredOptions(): T[] {
    return this.searchService.results;
  }

  // Deprecated
  public get availableOptions(): T[] {
    return this.filteredOptions;
  }

  public get query(): string | undefined {
    return this.isSearchable ? this.searchService.query : undefined;
  }

  public set query(query: string | undefined) {
    if (query != undefined) {
      this.queryUpdateHook();
      this.updateQuery(query);
      // Update the rendered text as query has changed.
      this._renderedOptions.forEach(ro => this.initialiseRenderedOption(ro));

      if (this.searchInput) {
        this.searchInput.query = query;
      }
    }
  }

  @Input()
  public get labelField(): string | undefined {
    return this.searchService.optionsField;
  }

  public set labelField(field: string | undefined) {
    this.searchService.optionsField = field;
  }

  public get labelGetter(): (obj: T) => string {
    // Helper function to retrieve the label from an item.
    return (obj: T) => {
      const label = Util.Object.readValue<T, string>(obj, this.labelField);
      if (label != undefined) {
        return label.toString();
      }
      return '';
    };
  }

  public get valueGetter(): (obj: T) => U {
    // Helper function to retrieve the value from an item.
    return (obj: T) => Util.Object.readValue<T, U>(obj, this.valueField);
  }

  public get configuredFormatter(): (option: T) => string {
    if (this._optionFormatter) {
      return o => this._optionFormatter!(o, this.isSearchable ? this.query : undefined);
    } else if (this.searchService.optionsLookup) {
      return o => this.labelGetter(o);
    } else {
      return o => this.searchService.highlightMatches(this.labelGetter(o), this.query || '');
    }
  }

  private _optionFormatter?: (o: T, q?: string) => string;

  @Input()
  public set optionFormatter(formatter: ((option: T, query?: string) => string) | undefined) {
    this._optionFormatter = formatter;
  }

  private _localeValues: ISelectLocaleValues;

  public get localeValues(): ISelectLocaleValues {
    return this._localizationService.override<'select'>(this._localeValues, this.localeOverrides);
  }

  public ngAfterContentInit(): void {
    this._menu.service = this.dropdownService;
    // We manually specify the menu items to the menu because the @ContentChildren doesn't pick up our dynamically rendered items.
    this._menu.items = this._renderedOptions;
    this._menu.parentElement = this._element;

    if (this._manualSearch) {
      this.isSearchable = true;
      this.isSearchExternal = true;
    }

    if (this.searchInput) {
      this.searchInput.onQueryUpdated.subscribe((q: string) => this.query = q);
      this.searchInput.onQueryKeyDown.subscribe((e: KeyboardEvent) => this.onQueryInputKeydown(e));
    }

    // We must call this immediately as changes doesn't fire when you subscribe.
    this.onAvailableOptionsRendered();
    this._renderedOptions.changes.subscribe(() => this.onAvailableOptionsRendered());
  }

  public abstract selectOption(option: T): void;

  public onCaretClick(e: HandledEvent): void {
    if (!e.eventHandled) {
      e.eventHandled = true;

      if (!this.dropdownService.isAnimating) {
        this.dropdownService.setOpenState(!this.dropdownService.isOpen);

        this.focus();
      }
    }
  }

  @HostListener('click', ['$event'])
  public onClick(e: HandledEvent): void {
    if (!e.eventHandled && !this.dropdownService.isAnimating) {
      e.eventHandled = true;

      // If the dropdown is searchable, clicking should keep it open, otherwise we toggle the open state.
      this.dropdownService.setOpenState(this.isSearchable ? true : !this.dropdownService.isOpen);

      // Immediately focus the search input whenever clicking on the select.
      this.focus();
    }
  }

  @HostListener('focusin')
  public onFocusIn(): void {
    if (!this.dropdownService.isOpen && !this.dropdownService.isAnimating) {
      this.dropdownService.setOpenState(true);

      this.focus();
    }
  }

  @HostListener('focusout', ['$event'])
  public onFocusOut(e: IFocusEvent): void {
    if (!this._element.nativeElement.contains(e.relatedTarget)) {
      this.dropdownService.setOpenState(false);
      this.onTouched.emit();
    }
  }

  @HostListener('keypress', ['$event'])
  public onKeyPress(e: KeyboardEvent): void {
    if (e.keyCode === KeyCode.Enter) {
      // Enables support for focussing and opening with the keyboard alone.
      // Using directly because Renderer2 doesn't have invokeElementMethod method anymore.
      this._element.nativeElement.click();
    }
  }

  @HostListener('keydown', ['$event'])
  public onKeyDown(e: KeyboardEvent): void {
    if (!this.dropdownService.isOpen && e.keyCode === KeyCode.Down) {

      // Enables support for focussing and opening with the keyboard alone.
      // Using directly because Renderer2 doesn't have invokeElementMethod method anymore.
      this._element.nativeElement.click();

      e.preventDefault();
    }
  }

  public onQueryInputKeydown(event: KeyboardEvent): void {
  }

  public ngOnDestroy(): void {
    this._renderedSubscriptions.forEach(s => s.unsubscribe());
  }

  // Hook is here since Typescript doesn't yet support overriding getters & setters while still calling the superclass.
  protected optionsUpdateHook(): void {
  }

  // Hook is here since Typescript doesn't yet support overriding getters & setters while still calling the superclass.
  protected queryUpdateHook(): void {
  }

  protected updateQuery(query: string): void {
    // Update the query then open the dropdown, as after keyboard input it should always be open.
    this.searchService.updateQuery(query, () =>
      this.dropdownService.setOpenState(true));
  }

  protected resetQuery(delayed: boolean = true): void {
    // The search delay is set to the transition duration to ensure results
    // aren't rendered as the select closes as that causes a sudden flash.
    if (delayed) {
      this.searchService.searchDelay = this._menu.menuTransitionDuration;
      this.searchService.updateQueryDelayed('');
    } else {
      this.searchService.updateQuery('');
    }

    if (this.searchInput) {
      this.searchInput.query = '';
    }
  }

  protected onAvailableOptionsRendered(): void {
    // Unsubscribe from all previous subscriptions to avoid memory leaks on large selects.
    this._renderedSubscriptions.forEach(rs => rs.unsubscribe());
    this._renderedSubscriptions = [];

    this._renderedOptions.forEach(ro => {
      // Slightly delay initialisation to avoid change after checked errors. TODO - look into avoiding this!
      setTimeout(() => this.initialiseRenderedOption(ro));

      this._renderedSubscriptions.push(ro.onSelected.subscribe(() => this.selectOption(ro.value)));
    });

    // If no options have been provided, autogenerate them from the rendered ones.
    if (this.searchService.options.length === 0 && !this.searchService.optionsLookup) {
      this.options = this._renderedOptions.map(ro => ro.value);
    }
  }

  protected initialiseRenderedOption(option: FuiSelectOption<T>): void {
    option.usesTemplate = !!this.optionTemplate;
    option.formatter = this.configuredFormatter;

    if (option.usesTemplate) {
      this.drawTemplate(option.templateSibling, option.value);
    }

    option.changeDetector.markForCheck();
  }

  protected findOption(options: T[], value: U): T | undefined {
    // Tries to find an option in options array
    return options.find(o => value === this.valueGetter(o));
  }

  protected focus(): void {
    if (this.isSearchable && this.searchInput) {
      // Focusses the search input only when searchable.
      // Using directly because Renderer2 doesn't have invokeElementMethod method anymore.
      this.searchInput.focus();
    } else {
      this._element.nativeElement.focus();
    }
  }

  // Helper that draws the provided template beside the provided ViewContainerRef.
  protected drawTemplate(siblingRef: ViewContainerRef, value: T): void {
    siblingRef.clear();
    // Use of `$implicit` means use of <ng-template let-option> syntax is supported.
    siblingRef.createEmbeddedView(this.optionTemplate, {
      $implicit: value,
      query: this.query
    });
  }

  private onLocaleUpdate(): void {
    this._localeValues = this._localizationService.get().select;
  }
}
