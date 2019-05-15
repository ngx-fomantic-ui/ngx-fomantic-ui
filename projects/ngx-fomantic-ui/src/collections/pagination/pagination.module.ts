import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FuiPagination} from './components/pagination';

@NgModule({
  imports: [CommonModule],
  exports: [FuiPagination],
  declarations: [FuiPagination],
  providers: []
})
export class FuiPaginationModule {
}
