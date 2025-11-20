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
        display: flex;
        flex-direction: column;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        height: 70vh;
        border-radius: 5px;
        overflow-y: scroll;
      }

      .chat-box::-webkit-scrollbar {
        width: 5px;
        transition: width 0.3s;
      }

      .chat-box:hover::-webkit-scrollbar {
        width: 5px;
      }

      .chat-box::-webkit-scrollbar-track {
        background-color: transparent;
        border-radius: 10px;
      }

      .chat-box:hover::-webkit-scrollbar-thumb {
        background: gray;
        border-radius: 10px;
      }

      chat-box::-webkit-scrollbar-thumb:hover {
        background: #555;
      }

      .chat-icon {
        width: 40px;
        height: 40px;
        font-size: 48px;
      }
    `,
  ],
})
export class ChatBox {
  chatService = inject(ChatService);
  authService = inject(AuthService);
  private pageNumber = 2;

  loadMoreMessage() {
    this.pageNumber++;
    this.chatService.loadMessages(this.pageNumber);
  }
}
