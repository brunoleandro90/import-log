import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  canActivate() {
    if (this.localStorageService.isLogged()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}