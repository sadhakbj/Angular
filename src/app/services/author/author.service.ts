import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  constructor(private http: HttpClient) {}

  /**
   *
   * @param Object authorData
   */
  registerUser(authorData: Object) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(`${environment.apiUrl}/authors`, authorData, {
      headers: headers
    });
  }

  getAll() {
    return this.http.get(`${environment.apiUrl}/authors`);
  }
}
