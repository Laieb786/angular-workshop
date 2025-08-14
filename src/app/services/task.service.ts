import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class  TaskService {
  httpClient = inject(HttpClient);
  getInitialTasks() {
    return [
      { id: 1, title: 'Learn Signals', status: 'done' },
      { id: 2, title: 'Explore Signal Store Events', status: 'pending' }
    ];
  }
  //Hier wird eine externe API angesprochen, um Daten zu laden.
  getTitlePerApi(title: string): Observable<{count: number, title: string, gender: string, probability: number }> {
    return <Observable<any>>this.httpClient.get('https://api.genderize.io/?name=title')
  }
}
