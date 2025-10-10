import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthService } from '../services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../models/api-response';

@Component({
  selector: 'app-login',
  imports: [MatInputModule, MatIconModule, FormsModule, MatCheckboxModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email!: string;
  password!: string;
  // rememberMe: boolean = false;
  isLoading: boolean = false;
  loginError: boolean = false;

  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  hide = signal(false);

  login() {
      this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.authService.me().subscribe();
        this.snackBar.open('Logged in successfully', 'Close');
      },
      error: (err: HttpErrorResponse) => {        
        let error = err.error as ApiResponse<string>;
        
          this.snackBar.open(error.error, 'Close', {
            duration: 3000,
          });
        },
      complete: () => {
        this.router.navigate(['/']);
      },
    });
  }

  togglePassword(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

}