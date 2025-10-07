import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import {MatFormFieldModule} from "@angular/material/form-field"
import {MatInputModule} from "@angular/material/input"
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [MatFormFieldModule, FormsModule, MatInputModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
email!:string;
password!:string;
fullName!:string;
profilePicture: string = 'https://randomuser.me/portraits/lego/5.jpg';
profile: File | null = null;

authService = inject(AuthService)
}
