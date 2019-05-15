import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FuiRating, FuiRatingValueAccessor} from './components/rating';

@NgModule({
  imports: [
    FormsModule,
    CommonModule
  ],
  declarations: [
    FuiRating,
    FuiRatingValueAccessor
  ],
  exports: [
    FuiRating,
    FuiRatingValueAccessor
  ]
})
export class FuiRatingModule {
}
