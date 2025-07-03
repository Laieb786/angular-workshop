import { Component } from '@angular/core';
import { TaskListComponent } from './components/task-list.component';
import { DeferViewComponent } from './components/defer-view.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskListComponent, DeferViewComponent],
  template: `
    <h1>Signal Store + Events + Defer Demo</h1>
    <app-task-list></app-task-list>
    <hr />
    <app-defer-view></app-defer-view>
  `
})
export class AppComponent {}
