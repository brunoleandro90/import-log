import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setLoggedUser(data: any) {
    localStorage.setItem('importlog.isLoggedin', 'true');
    let dateNow: Date = new Date();
    dateNow.setSeconds(dateNow.getSeconds() + data.expiresIn);
    localStorage.setItem('importlog.expiresIn', dateNow.toString());
    localStorage.setItem('importlog.token', data.accessToken);
  }

  logOff() {
    localStorage.removeItem('importlog.isLoggedin');
    localStorage.removeItem('importlog.expiresIn');
    localStorage.removeItem('importlog.token');
  }

  isLogged() {
    if (localStorage.getItem('importlog.isLoggedin')) {
      let dateNow: Date = new Date();
      let expiresIn = localStorage.getItem('importlog.expiresIn');
      return (expiresIn && new Date(expiresIn) >= dateNow);
    } else {
      return false;
    }
  }

  getUserToken() {
    return localStorage.getItem('importlog.token');
  }
}
