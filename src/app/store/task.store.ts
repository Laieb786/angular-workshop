import {signalStore, withState, withMethods, withComputed, withHooks, patchState} from '@ngrx/signals';
import { computed, inject, signal } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Events } from '@ngrx/signals/events';
import { taskAdded } from '../events/task.events';
import {withDevtools} from "@angular-architects/ngrx-toolkit";

interface Task {
  id: number;
  title: string;
  status: 'pending' | 'done';
}

export const TaskStore = signalStore(
  withState({ tasks: [] }),
  withDevtools("TaskStore"),
  withComputed(store => ({
    completed: computed(() => store.tasks().filter(t => t.status === 'done'))
  })),
  withMethods((store, taskService = inject(TaskService)) => ({
    loadInitial: () => {
      const data = taskService.getInitialTasks();
      patchState(store, {tasks: data})
    },
    addTask: (title: string) => {
      const newTask = { id: Date.now(), title, status: 'pending' };
      patchState(store, {tasks: [...store.tasks(), newTask]})
    },
    deleteTask: () => {
      const deleteTask = store.tasks();
      if (deleteTask.length > 0) {
        const updatedTasks = deleteTask.slice(0, -1); // Remove the last task
        patchState(store, {tasks: updatedTasks});
      }
    }
  })),
  withHooks(store => {
    return {
      onInit() {
        store.loadInitial();
      }
    };
  })
);
