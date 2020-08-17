import { Component, Input, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { HighlightJS, HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'demo-codeblock',
  template: `
    <pre><code [innerHTML]="html"></code></pre>
  `,
  styleUrls: ['./codeblock.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CodeblockComponent implements OnInit {
  @Input()
  public language: string;

  @Input()
  public src: string;

  public html: string;

  constructor(private highlight: HighlightJS) {
  }

  ngOnInit(): void {
    this.highlight.highlightAuto(this.src, ['xml', 'javascript', 'typescript', 'markup', 'bash']).subscribe((result: HighlightResult) => {
      this.html = result.value;
    });
  }
}
