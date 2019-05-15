import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {HighlightJS} from 'ngx-highlightjs';

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

  public ngOnInit(): void {
    this.html = this.highlight.highlightAuto(this.src, ['javascript', 'typescript', 'css', 'markup', 'bash']).value;
  }
}
