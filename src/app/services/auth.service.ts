import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  currentUser: Object = null;
  userToken: String = null;

  /**
   *
   * @param Object userData
   */
  registerUser(userData) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(`${environment.apiUrl}/auth/register`, userData);
  }

  /**
   *
   * @param Object credentials
   */
  authenticate(credentials: Object) {
    return this.http.post(`${environment.apiUrl}/auth/login`, credentials);
  }

  /**
   * Get the current user from the backend.
   */
  getCurrentUser() {
    return this.http.get(`${environment.apiUrl}/user`);
  }

  /**
   * Store user's data in local. storage.
   * @param Object user
   */
  storeUser(user: Object) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', user['token']);
    this.userToken = user['token'];
    this.currentUser = user;
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  /**
   * Remove the token and user from localstorage.
   */
  logOut() {
    this.userToken = null;
    this.currentUser = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  /**
   * Get the authenticated token.
   */
  getToken(): String {
    return localStorage.getItem('token');
  }
}
