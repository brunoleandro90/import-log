import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login';
import { NewUser } from '../models/new-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public create = (newUser: NewUser) => {
    return this.http.post(`${environment.urlAddress}/new-account`, newUser, this.generateHeaders());
  }

  public login = (login: Login) => {
    return this.http.post(`${environment.urlAddress}/login`, login, this.generateHeaders());
  }

  protected generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  }
}
