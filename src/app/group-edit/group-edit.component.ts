import { Component } from '@angular/core';
import { Group } from '../models/group';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-group-edit',
  standalone: true,
  imports: [],
  templateUrl: './group-edit.component.html',
  styleUrl: './group-edit.component.css',
})
export class GroupEditComponent {
  group!: Group;
  feedback: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map((p: any) => p['id']),
        switchMap((id) => {
          if (id == 'new') {
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
          this.feedback = { type: 'warning', message: 'Error Loading' };
        },
      });
  }

  save() {
    const id = this.group.id;
    const method = id ? 'put' : 'post';

    this.http[method](``)
  }
}
