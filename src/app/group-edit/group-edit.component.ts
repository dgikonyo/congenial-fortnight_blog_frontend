import { Component, OnInit } from '@angular/core';
import { Group } from '../models/group';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { identity, switchMap } from 'rxjs';
import { Event } from '../models/event';

@Component({
  selector: 'app-group-edit',
  standalone: true,
  imports: [],
  templateUrl: './group-edit.component.html',
  styleUrl: './group-edit.component.css',
})
export class GroupEditComponent implements OnInit {
  group!: Group;
  feedback: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  /**
   * map ->
   * switchMap -> The switchMap operator will create a derived observable
   * (called inner observable) from a source observable and emit those values.
   */
  ngOnInit() {
    this.route.params.pipe(
        map((id: any) => id['id']),
        switchMap((id) => {
          if (id === 'new') {
            return of(new Group());
          }
          return this.http.get<Group>(`api/group/${id}`);
        })
      )
      .subscribe({
        next: (group) => {
          this.group = group;
          this.feedback = {};
        },
        error: () => {
          this.feedback = { type: 'warning', message: 'Error loading' };
        },
      });
  }

  save() {
    const id = this.group.id;
    const method = id ? 'put' : 'post';

    this.http[method](`api/group ${id ? '/' + id : ''}`, this.group).subscribe({
      next: () => {
        this.feedback = { type: 'success', message: 'Save was successful!' };

        setTimeout(async () => {
          // returns us to the page with all groups!
          await this.router.navigate(['/groups']);
        }, 1000);
      },

      error: () => {
        this.feedback = { type: 'error', message: 'Error saving' };
      },
    });
  }

  async cancel() {
    await this.router.navigate(['/groups']);
  }

  addEvent() {
    this.group.events.push(new Event());
  }

  removeEvent(index: nunmber) {
    this.group.events.splice(index, 1);
  }
}
