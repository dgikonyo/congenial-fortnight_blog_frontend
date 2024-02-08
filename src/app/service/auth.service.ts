import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { lastValueFrom, map, of, switchMap } from 'rxjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { Location } from '@angular/common';

const headers = new HttpHeaders().set('Accept', 'application/json');

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // $ sign means that the authenticationState is an object.
  $authenticationState = new BehaviorSubject<Boolean>(false);

  constructor(private http: HttpClient, private location: Location) {}

  getUser(): Observable<User> {
    return this.http.get<User>('/api/user', { headers }).pipe(
      map((response: User) => {
        if (response !== null) {
          this.$authenticationState.next(true);
        }
        return response;
      })
    );
  }

  async isAuthenticated(): Promise<boolean> {
    const user = await lastValueFrom(this.getUser());
    return user !== null;
  }

  login(): void {
    location.href = `${location.origin}${this.location.prepareExternalUrl(
      'oauth2/authorization/okta'
    )}`;
  }

  logout(): void {
    this.http
      .post('/api/logout', {}, { withCredentials: true })
      .subscribe((response: any) => {
        location.href = response.logoutUrl;
      });
  }
}
