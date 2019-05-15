import { Component, OnDestroy } from '@angular/core';
import { FuiLocalizationService } from 'ngx-fomantic-ui';
import locales from 'ngx-fomantic-ui/locales';

const exampleTemplate = `
<div class="ui segments">
    <div class="ui segment">
        <p>Language</p>
        <fui-select class="selection"
                    [(ngModel)]="language"
                    [options]="languages"
                    labelField="name"
                    valueField="code"
                    [isSearchable]="true"
                    #lang>

            <fui-select-option *ngFor="let l of lang.availableOptions"
                               [value]="l"></fui-select-option>
        </fui-select>
    </div>
    <div class="ui segment">
        <div class="ui left icon fluid input">
            <i class="calendar icon"></i>
            <input fuiDatepicker pickerMode="date" [pickerUseNativeOnMobile]="false">
        </div>
    </div>
    <div class="ui segment">
        <fui-select class="fluid selection">
            <fui-select-option value="Option 1"></fui-select-option>
            <fui-select-option value="Option 2"></fui-select-option>
            <fui-select-option value="Option 3"></fui-select-option>
        </fui-select>
    </div>
</div>
`;

interface ISupportedLanguage {
    name: string;
    code?: string;
    children?: ISupportedLanguage[];
    default?: boolean;
}

const supportedLanguages: ISupportedLanguage[] = [
    {
        name: 'English',
        children: [
            {
                name: 'Australian',
                code: 'en-AU'
            },
            {
                name: 'UK',
                code: 'en-GB',
                default: true
            },
            {
                name: 'US',
                code: 'en-US'
            }
        ]
    },
    {
        name: 'Spanish',
        code: 'es'
    },
    {
        name: 'Italian',
        code: 'it'
    },
    {
        name: 'Portuguese',
        code: 'pt'
    },
    {
        name: 'French',
        code: 'fr'
    },
    {
        name: 'German',
        code: 'de'
    },
    {
        name: 'Russian',
        code: 'ru'
    },
    {
        name: 'Hebrew',
        code: 'he'
    },
    {
        name: 'Dutch',
        code: 'nl'
    },
    {
        name: 'Georgian',
        code: 'ge'
    }
];

@Component({
    selector: 'demo-page-localization',
    templateUrl: './localization.page.html'
})
export class LocalizationPage {
    public localizationCode = `
import {FuiLocalizationService} from "ngx-fomantic-ui";
// We'll use Spanish for this example.
import es from "ngx-fomantic-ui/locales/es";

@Component({
    selector: "app-root",
    ...
})
export class AppComponent {
    constructor(public localizationService:FuiLocalizationService) {
        // Load the Spanish translations into the Localization Service.
        localizationService.load("es", es);
        // Set the current language to Spanish.
        localizationService.setLanguage("es");
    }
}
`;

    public customizationCode = `
import {FuiLocalizationService} from "ngx-fomantic-ui";
// This example uses French.
import fr from "ngx-fomantic-ui/locales/fr";

@Component({
    selector: "app-root",
    ...
})
export class AppComponent {
    constructor(public localizationService:FuiLocalizationService) {
        // Start by choosing a "fallback" language,
        // i.e. which language to use if you don't provide a certain value.
        localizationService.load("fr", fr);

        // Next, modify the "fallback" language with your custom values:
        localizationService.patch("fr", {
            search: {
                placeholder: "Custom!"
            }
        });

        // Finally, update the current language:
        localizationService.setLanguage("fr");
    }
}
`;

    public valuesInterface = `
interface ILocaleValues {
    datepicker: {
        months:string[], // Full month names
        monthsShort:string[], // Short month names (3 letters)
        weekdays:string[], // Full day names
        weekdaysShort:string[], // Short day names (3 letters)
        weekdaysNarrow:string[], // Narrow day names (1/2 letters)
        timesOfDay:string[]; // Full time of day names (2 values only)
        timesOfDayUppercase:string[]; // Short uppercase time of day names (2 values only)
        timesOfDayLowercase:string[]; // Short lowercase time of day names (2 values only)
        formats: {
            time:string, // Date display format for 'time' mode
            datetime:string, // Display format for 'datetime' mode
            date:string, // etc.
            month:string,
            year:string
        },
        firstDayOfWeek:number // First day of the week, [0..6], 0 is Sunday, 6 is Saturday
    },
    search: {
        placeholder:string, // Default placeholder for search input
        noResults: { // Message shown when there are no search results
            header:string,
            message:string
        }
    },
    select: {
        noResultsMessage:string, // Shown when there are no search results
        single: { // Specific options for single-select
            placeholder:string // Default placeholder
        },
        multi: { // Specific options for multi-select
            placeholder:string, // Default placeholder
            maxSelectedMessage:string // Shown when max options selected (use #{max} to display value)
        }
    }
}
`;

    public exampleTemplate: string = exampleTemplate;
    public supportedLanguages: ISupportedLanguage[] = supportedLanguages;
}

@Component({
    selector: 'example-localization',
    template: exampleTemplate
})
export class LocalizationExample implements OnDestroy {
    public languages: ISupportedLanguage[];

    public get language(): string {
        return this.localizationService.language;
    }

    public set language(language: string) {
        this.localizationService.setLanguage(language);
    }

    constructor(public localizationService: FuiLocalizationService) {
        this.languages = [];

        supportedLanguages.forEach(l => {
            if (l.children) {
                l.children.forEach(c => {
                    this.languages.push({
                        name: `${l.name} (${c.name})`,
                        code: `${c.code}`
                    });
                });
                return;
            }
            this.languages.push(l);
        });

        this.localizationService.setLanguage('en-GB');

        Object.keys(locales).forEach(k => this.localizationService.load(k, locales[k]));
    }

    public ngOnDestroy(): void {
        this.localizationService.setLanguage('en-GB');
    }
}

export const LocalizationPageComponents = [LocalizationPage, LocalizationExample];
