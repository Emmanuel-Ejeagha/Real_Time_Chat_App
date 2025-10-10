import { Component, inject } from '@angular/core';
import { ChatService } from '../../services/chat-service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AuthService } from '../../services/auth-service';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-chat-box',
  imports: [MatProgressSpinner, DatePipe, MatIconModule],
  templateUrl: './chat-box.html',
  styles: [
    `
      .chat-box {
        scroll-behavior: smooth;
        overflow: hidden;
        padding: 10px;
        background-color: #f5f5f5;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        height: 70vh;
        border-raduis: 5px;
        overflow-y: scroll;
      }
    `,
  ],
})
export class ChatBox {
  chatService = inject(ChatService);
  authService = inject(AuthService);
}
