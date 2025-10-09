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
    // Reset error state
    this.loginError = false;
    
    // Set loading state
    this.isLoading = true;

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.authService.me().subscribe();
        this.snackBar.open('Logged in successfully', 'Close', {
          duration: 3000,
        });
        
        // // Handle remember me functionality if needed
        // if (this.rememberMe) {
        //   this.handleRememberMe();
        // }
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        
        let error = err.error as ApiResponse<string>;
        
        // Check if it's an invalid credentials error (401 or similar)
        if (err.status === 401 || err.status === 400) {
          this.loginError = true;
          // Show inline error in form, no snackbar for credential errors
        } else {
          // For other errors, show snackbar
          this.snackBar.open(error?.error || 'Login failed. Please try again.', 'Close', {
            duration: 5000,
          });
        }
      },
      complete: () => {
        this.isLoading = false;
        this.router.navigate(['/']);
      }
    });
  }

  togglePassword(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  
    // Alternative: If using OAuth redirect instead of direct API call
    // this.authService.initiateSocialLogin(provider);
  

  clearError() {
    this.loginError = false;
  }

  // private handleRememberMe() {
  //   // Implement remember me functionality
  //   // This could set a longer-lasting token in localStorage
  //   // or set cookies with extended expiration
  //   console.log('Remember me enabled - extending session');
    
  //   // Example: Store remember me preference
  //   localStorage.setItem('rememberMe', 'true');
  //   // Your AuthService might handle token persistence based on this
  // }

  // // Optional: Pre-fill email if remember me was used previously
  // ngOnInit() {
  //   const savedRememberMe = localStorage.getItem('rememberMe');
  //   if (savedRememberMe === 'true') {
  //     this.rememberMe = true;
  //     // You could also pre-fill email if you stored it securely
  //   }
  // }
}

// import { Component, inject, signal } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { MatIconModule } from '@angular/material/icon';
// import { MatInputModule } from '@angular/material/input';
// import { AuthService } from '../services/auth-service';
// import { Router } from '@angular/router';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { HttpErrorResponse } from '@angular/common/http';
// import { ApiResponse } from '../models/api-response';

// @Component({
//   selector: 'app-login',
//   imports: [MatInputModule, MatIconModule, FormsModule],
//   templateUrl: './login.html',
//   styleUrl: './login.css'
// })
// export class Login {
//   email!: string
//   password!: string

//   private authService = inject(AuthService);
//   private snackBar = inject(MatSnackBar)
//   private router = inject(Router)

//   hide = signal(false)

//   login() {
//     this.authService.login(this.email, this.password).subscribe({
//       next: () => {
//         this.snackBar.open("Logged in successfully", 'Close')
//       },
//       error: (err: HttpErrorResponse) => {
//         let error = err.error as ApiResponse<string>;

//         this.snackBar.open(error.error, 'Close', {
//           duration: 3000,
//         })
//       },
//       complete: () => {
//         this.router.navigate(['/'])
//       }
//     });
//   }

//   togglePassword(event:MouseEvent){
//     this.hide.set(!this.hide());
//     event.stopPropagation()
//   }
// }
