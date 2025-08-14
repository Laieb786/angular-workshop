import {signalStore, withState, withMethods, withComputed, withHooks, patchState} from '@ngrx/signals';
import { computed, inject, signal } from '@angular/core';
import { TaskService } from '../services/task.service';
import { taskEvents } from '../events/task.events';
import {withDevtools} from "@angular-architects/ngrx-toolkit";
import { Events } from '@ngrx/signals/events';

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
    //Methode zum Hinzufügen von Aufgaben
    addTask: (title: string) => {
      const newTask = { id: Date.now(), title, status: 'pending' };
      patchState(store, {tasks: [...store.tasks(), newTask]})
    },
    //Methode zum Entfernen von Aufgaben 
    deleteTask: ()  => { // in () könnenn wir auch Parameter übergeben, wie z.B. (title: string) oder (id: number)
      const deleteTask = store.tasks();
      if (deleteTask.length > 0) {
        patchState(store, {tasks: deleteTask.slice(0, -1)});
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
