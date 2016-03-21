import { Component } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { SignalRService } from '../../services/signalR.service';
import { ChatMessage } from '../../models/ChatMessage';
import { NeedsAuthentication } from '../../decorators/NeedsAuthentication';

@Component({
    selector: 'chat-component',
    templateUrl: 'app/components/chat/chat.component.html',
    directives: [CORE_DIRECTIVES],
})

@NeedsAuthentication()
export class ChatComponent {

    public currentMessage: ChatMessage;
    public allMessages: ChatMessage[];
    public canSendMessage: Boolean;

    constructor(private _signalRService: SignalRService) {
        this.subscribeToEvents();
        this.canSendMessage = _signalRService.connectionExists;
        this.currentMessage = new ChatMessage('', null);
        this.allMessages = new Array<ChatMessage>();
    }

    public sendMessage() {
        if (this.canSendMessage) {
            this.currentMessage.Sent = new Date();
            this._signalRService.sendChatMessage(this.currentMessage);
        }
    }

    private subscribeToEvents(): void {
        this._signalRService.connectionEstablished.subscribe(() => {
            this.canSendMessage = true;
        });

        this._signalRService.messageReceived.subscribe((message: ChatMessage) => {
            this.currentMessage = new ChatMessage('', null);
            this.allMessages.push(new ChatMessage(message.Message, message.Sent.toString()));
        });
    }
}