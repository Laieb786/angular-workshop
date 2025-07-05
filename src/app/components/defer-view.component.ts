import { Component, signal } from "@angular/core";

@Component({
  selector: "app-defer-view",
  standalone: true,
  imports: [],
  template: `
    <h2>Deferred View Example</h2>
    @defer (when show()) {
    <p>🚀 Content loaded after delay!</p>
    } @placeholder {
    <p>⏳ Loading content...</p>
    }

    <button (click)="load()">Load Deferred Content</button>
  `,
})
export class DeferViewComponent {
  show = signal(false);
  load() {
    this.show.set(true);
  }
}
