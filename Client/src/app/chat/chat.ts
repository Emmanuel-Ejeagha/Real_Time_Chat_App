import { Component } from '@angular/core';
import { ChatSidebar } from '../components/chat-sidebar/chat-sidebar';
import { ChatWindowComponent } from '../components/chat-window/chat-window';
import { ChatRightSideBarComponent } from '../components/chat-right-sidebar/chat-right-sidebar';

@Component({
  selector: 'app-chat',
  imports: [ChatSidebar, ChatWindowComponent, ChatRightSideBarComponent],
  templateUrl: './chat.html',
  styleUrl: './chat.css'
})
export class Chat {

}
