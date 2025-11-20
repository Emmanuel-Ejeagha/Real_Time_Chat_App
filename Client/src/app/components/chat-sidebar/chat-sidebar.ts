import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { ChatService } from '../../services/chat-service';
import { TitleCasePipe } from '@angular/common';
import { User } from '../../models/user';
import { TypingIndicator } from '../typing-indicator/typing-indicator';

@Component({
  selector: 'app-chat-sidebar',
  imports: [MatIconModule, MatMenuModule, TypingIndicator, TitleCasePipe],
  templateUrl: './chat-sidebar.html',
  styles: ``,
})
export class ChatSidebar implements OnInit {
  authService = inject(AuthService);
  chatService = inject(ChatService);
  router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.chatService.disconnectConnection();
  }

  ngOnInit(): void {
    this.chatService.startConnection(this.authService.getAccessToken!);
    // Check current user data
    console.log('Current user:', this.authService.currentLoggedUser);
    console.log(
      'Current user profile picture:',
      this.authService.currentLoggedUser?.profilePicture
    );

    // Check if online users have the property
    this.chatService.onlineUsers().forEach((user, index) => {
      console.log(`User ${index} profile:`, user.profilePicture);
    });
  }

  openChatWindow(user: User) {
    this.chatService.currentOpenedChat.set(user);
    this.chatService.loadMessages(1);
  }
}
