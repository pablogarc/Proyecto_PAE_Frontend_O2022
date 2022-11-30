import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  googleLogin(name: string, email: string): Observable<any> {
    const url = environment.apiUrl + '/google';
    return this.http.post(url, { name, email }, { responseType: 'json' });
  }

  login(email: string, password: string): Observable<any> {
    const url = environment.apiUrl + '/login';
    return this.http.post(url, { email, password }, { responseType: 'json' });
  }

  signup(name: string, email: string, password: string): Observable<any> {
    const url = environment.apiUrl + '/user';
    return this.http.post(
      url,
      { name, email, password },
      { responseType: 'json' }
    );
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  setCurrentUserId(userId: string) {
    localStorage.setItem('id', userId);
  }

  logout() {
    localStorage.clear();
  }

  checkUser() {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    if (!id || !token) {
      return false;
    }
    return true;
  }

  updateImage(formData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');

    const url = `${environment.apiUrl}/user/${id}/image`;
    return this.http.put(url, formData, {
      headers: { authorization: 'Bearer ' + token },
      responseType: 'text',
    });
  }

  updateUser(data: string, flag: string): Observable<any> {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    const url = `${environment.apiUrl}/user/${id}`;

    if (flag === 'description') {
      const description = data;
      return this.http.put(
        url,
        { description },
        {
          headers: { authorization: 'Bearer ' + token },
          responseType: 'text',
        }
      );
    } else if (flag === 'password') {
      const password = data;
      return this.http.put(
        url,
        { password },
        {
          headers: { authorization: 'Bearer ' + token },
          responseType: 'text',
        }
      );
    } else if (flag === 'email') {
      const email = data;
      return this.http.put(
        url,
        { email },
        {
          headers: { authorization: 'Bearer ' + token },
          responseType: 'text',
        }
      );
    } else {
      const full_name = data;
      return this.http.put(
        url,
        { full_name },
        {
          headers: { authorization: 'Bearer ' + token },
          responseType: 'text',
        }
      );
    }
  }

  getCurrentUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + token,
      }),
    };

    const url = `${environment.apiUrl}/user/${id}`;
    return this.http.get(url, httpOptions);
  }

  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');

    const url = `${environment.apiUrl}/user/${id}`;
    return this.http.delete(url, {
      headers: { authorization: 'Bearer ' + token },
      responseType: 'text',
    });
  }
}
