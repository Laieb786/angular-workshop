import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import {provideZonelessChangeDetection} from "@angular/core";
import {TaskStore} from "./app/store/task.store";

bootstrapApplication(AppComponent, {
  providers: [provideAnimations(), provideHttpClient(), provideZonelessChangeDetection(), TaskStore]
})
