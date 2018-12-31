import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, catchError, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(userData) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post('https://laravelspa.dev/api/auth/register', userData, {
      headers: headers
    });
  }
}
