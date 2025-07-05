import { Component, inject } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { TaskStore } from "../store/task.store";
import { Events } from "@ngrx/signals/events";
import { taskAdded } from "../events/task.events";

@Component({
  selector: "app-task-list",
  standalone: true,
  imports: [],
  template: `
    <button style="margin-right: 30px;" (click)="addSampleTask()">Add Task</button> <button (click)="deleteSampleTask()">Delete Task</button>
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
  store = inject(TaskStore);
  events = inject(Events);

  addSampleTask() {
    this.store.addTask("New Task from Button");
    // this.events.emit(taskAdded({ title: 'New Task from Button' }));
  }
  deleteSampleTask(){
    this.store.deleteTask();
  }
}
