import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, isDevMode } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Baraza';

  ngOnInit() {
    if (isDevMode()) {
      console.log('Development');
    } else {
      console.log('Production!');
    }
  }
}
