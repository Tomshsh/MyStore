import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor() { }

  @Input() color:string | null = null

  ngOnInit(): void {
  }

}
