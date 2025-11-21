import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { VideoChatService } from '../services/video-chat';

@Component({
  selector: 'app-video-chat',
  imports: [MatIconModule],
  template: `
  <div class="relative h-full w-full">
    <video src="" class="w-32 absolute right-5 top-4 h-52 object-cover border-red-500 border-2 rounded-lg" #localVideo autoplay playsInline></video>
    <video src="" class="w-full h-full object-cover bg-slate-800" #remoteVideo autoplay playsInline></video>

    <div class="absolute bottom-10 left-0 right-0 z-50 flex justify-center space-x-3 p-4">
      <button class="bg-green-500 flex items-center gap-2 hover:bg-gray-700 shadow-xl text-white font-bold py-2 px-4 rounded-full">
      <mat-icon>
        call
      </mat-icon>
          Accept
        </button>
        <button class="bg-green-500 flex items-center gap-2 hover:bg-gray-700 shadow-xl text-white font-bold py-2 px-4 rounded-full">
      <mat-icon>
        call_end
      </mat-icon>
          Decline
        </button>
        <button class="bg-green-500 flex items-center gap-2 hover:bg-gray-700 shadow-xl text-white font-bold py-2 px-4 rounded-full">
      <mat-icon>
        call
      </mat-icon>
          End Call
        </button>
        </div>
  </div>
  `,
  styles: ``
})
export class VideoChat implements OnInit{
  @ViewChild("localVideo") localVideo!:ElementRef<HTMLVideoElement>;
  @ViewChild("remoteVideo") remoteVideo!:ElementRef<HTMLVideoElement>;

  private peerConnection!:RTCPeerConnection;
  signalRService = inject(VideoChatService)

  ngOnInit(): void {
      
  }

  setupSignalListers(){
    this.signalRService.hubConnection.on("CallEnded", () => {
      // task to endCall()
    })

    this.signalRService.answerReceived.subscribe(async(data) => {
      if (data) {
        await this.peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
      }
    })

    this.signalRService.iceCandidateReceived.subscribe(async(data) => {
      if (data)
        await this.peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate))
    })
  }

  declineCall(){
    this.signalRService.
  }
}
