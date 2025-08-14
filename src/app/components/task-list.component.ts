import { Component, inject } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { TaskStore } from "../store/task.store";
import { taskEvents } from "../events/task.events";
import { event, Events } from "@ngrx/signals/events";

@Component({
  selector: "app-task-list",
  standalone: true,
  imports: [],
  template: `
    <button style="margin-right: 50px"(click)="addSampleTask()">Add Task</button> <button (click)="deleteSampleTask()">Delete Task</button>
    @if (store.tasks().length) {
    <ul>
      @for (task of store.tasks(); track task) {
      <li>{{ task.title }} - {{ task.status }}</li>
      }
    </ul>
    } @else {
    <p>No tasks available.</p>
    }
  `,
})
export class TaskListComponent {
  readonly store = inject(TaskStore);
  readonly events = inject(Events);

  constructor() {
    this.events
      .on(taskEvents.taskAdded)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        console.log("Task added event received");
      });

    this.events
      .on(taskEvents.taskDeleted)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        console.log("Task deleted event received");
      });
  } 

  addSampleTask() {
    this.store.addTask("New Task from Button");
    // this.events.emit(taskAdded({ title: 'New Task from Button' }));
  }
  
  deleteSampleTask(){
    this.store.deleteTask();
  }
}
