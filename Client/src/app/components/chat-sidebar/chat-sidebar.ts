import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { ChatService } from '../../services/chat-service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-chat-sidebar',
  imports: [MatIconModule, MatMenuModule, TitleCasePipe],
  templateUrl: './chat-sidebar.html',
  styles: ``
})
export class ChatSidebar implements OnInit{
handImageError($event: ErrorEvent) {
throw new Error('Image Method not implemented.');
}
 
  authService = inject(AuthService)
  chatService = inject(ChatService)
  router = inject(Router)

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
    this.chatService.disconnectConnection()
  }

  ngOnInit(): void {
  this.chatService.startConnection(this.authService.getAccessToken!)  
  }
}
