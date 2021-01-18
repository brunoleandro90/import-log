import { Injectable } from '@angular/core';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  open(message: string, action: string, duration: number = 5000) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }
}
