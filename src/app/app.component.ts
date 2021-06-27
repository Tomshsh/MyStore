import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'My Store';

  public sortEvent!: Event
  public filterEvent!: Event

  onSort($event: any){
    this.sortEvent = $event
  }

  onFilter($e: any){
    this.filterEvent = $e
  }
}
