import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { LocalStorageUtils } from '../utils/localstorage';

@Injectable()
export class AuthGuard implements CanActivate {
  localStorageUtils = new LocalStorageUtils();

  constructor(private router: Router,
  ) { }

  canActivate() {
    if (this.localStorageUtils.isLogged()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}