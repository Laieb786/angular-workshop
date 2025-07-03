import { Component, inject } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { TaskStore } from '../store/task.store';
import { Events } from '@ngrx/signals/events';
import { taskAdded } from '../events/task.events';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [NgForOf, NgIf],
  template: `
    <button (click)="addSampleTask()">Add Task</button>
    <ul *ngIf="store.tasks().length; else empty">
      <li *ngFor="let task of store.tasks()">
        {{ task.title }} - {{ task.status }}
      </li>
    </ul>
    <ng-template #empty><p>No tasks available.</p></ng-template>
  `
})
export class TaskListComponent {
  store = inject(TaskStore);
  events = inject(Events);

  addSampleTask() {
    this.store.addTask('New Task from Button');
   // this.events.emit(taskAdded({ title: 'New Task from Button' }));
  }
}
