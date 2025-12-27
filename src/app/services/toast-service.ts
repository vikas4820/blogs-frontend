import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  success(message: string) {
    this.open(message, 'success-snackbar');
  }

  error(message: string) {
    this.open(message, 'error-snackbar');
  }

  warning(message: string) {
    this.open(message, 'warning-snackbar');
  }

  info(message: string) {
    this.open(message, 'info-snackbar');
  }

  private open(message: string, panelClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [panelClass],
    });
  }
}
