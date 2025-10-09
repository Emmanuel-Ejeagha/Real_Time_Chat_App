import { Component } from '@angular/core';
import { ChatSidebar } from '../components/chat-sidebar/chat-sidebar';
import { ChatWindow } from '../components/chat-window/chat-window';

@Component({
  selector: 'app-chat',
  imports: [ChatSidebar, ChatWindow],
  templateUrl: './chat.html',
  styleUrl: './chat.css'
})
export class Chat {

}
