import {Component, ViewChild} from '@angular/core';
import {FuiToastContainer} from 'ngx-fomantic-ui';

@Component({
    selector: 'demo-page-test',
    templateUrl: './test.page.html'
})
export class TestPage {
  toastCounter = 0;

  @ViewChild('toastContainer', {static: false})
  toastContainer: FuiToastContainer;

  addToast() {
    this.toastContainer.addToast({
      title: 'New notification',
      message: `Hello this is notification #${++this.toastCounter}`,
      class: 'warning',
      showProgress: 'top'
    });
  }

  addToast2() {
    this.toastContainer.addToast({
      title: 'New notification',
      message: `Hello this is notification #${++this.toastCounter}`,
      class: 'error',
      showProgress: 'bottom'
    });
  }
}
