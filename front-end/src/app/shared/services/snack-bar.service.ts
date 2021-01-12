import { Injectable } from '@angular/core';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  open(message: string, action: string, duration: number = 4000) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  openError(fail: any) {
    let errors: string = '';

    if (fail.error) {
      for (let i = 0; i < fail.error.errors.length; i++) {
        if (errors)
          errors += '\n';
        errors += fail.error.errors[i];
      }
    } else {
      errors = 'Ops, ocorreu um erro! :(';
    }
    this.open(errors, 'Ok');
  }
}
