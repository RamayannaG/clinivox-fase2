
import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';

@Component({
  imports: [RouterLink, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('frontend');

  constructor(protected router: Router) {}
}
