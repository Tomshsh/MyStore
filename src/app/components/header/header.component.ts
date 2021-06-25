import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
  <ui-toolbar>
  <ui-container>
    <h1>{{title}}</h1>
    <div class="spacer" [style]="{'flex': '1 1 auto'}"></div>
  </ui-container>
</ui-toolbar>
`,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  @Input() title: string = ""

  ngOnInit(): void {
  }

}
