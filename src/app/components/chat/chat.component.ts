import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from "../../service/MessageService/message.service";
import {MessageDTO} from "../../dto/MessageDTO";
import {Message} from "../../dto/Message";
import {WebSocketService} from "../../service/WebSocketService/web-socket.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() recipient!: string;
  @Input() emitter!: string;
  messages: Message[] = [];
  userInput: string = '';
  isTyping: boolean = false;


  constructor(private messageService: MessageService, private webSocketService: WebSocketService,) {
  }

  ngOnInit(): void {
    this.messageService.getMessages(this.emitter, this.recipient).subscribe(data => {
      data.forEach((message: MessageDTO) => {
        if (message.sender === this.emitter) {
          this.messages.push({text: message.text, sender: 'sent', read: message.seen, id: message.id});
        } else {
          this.messages.push({text: message.text, sender: 'received', read: message.seen, id: message.id});
        }
      });

      this.webSocketService.connect("http://localhost:8085/socket");
      this.webSocketService.stompClient.connect({}, (frame: any) => {
        this.webSocketService.stompClient.subscribe("/topic/socket/messages/" + this.emitter + "/" + this.recipient, (message) => {
          const messageDto: MessageDTO = JSON.parse(message.body);
          this.messages.push({text: messageDto.text, sender: 'received', read: false, id: messageDto.id});
        });
      });
      this.webSocketService.secondStompClient.connect({}, (frame: any) => {
        this.webSocketService.secondStompClient.subscribe("/topic/socket/messages/" + this.emitter + "/" + this.recipient + "/seen", (message) => {
          this.messages.forEach(message => {
            if (message.sender === 'sent')
              message.read = true
          });
        });
      });

      this.webSocketService.thirdStompClient.connect({}, (frame: any) => {
        this.webSocketService.thirdStompClient.subscribe("/topic/socket/messages/" + this.emitter + "/" + this.recipient + "/typing", (message) => {
          if (!(message.body === 'no')){
            this.isTyping = true;
          } else {
            this.isTyping = false;
          }
        });
      });

    });
  }


  sendMessage() {
    if (this.userInput.trim() === '') {
      return;
    }

    this.messageService.sendMessage(this.userInput, this.recipient, this.emitter).subscribe(data => {
      this.messages.push({text: this.userInput, sender: 'sent', read: false, id: data.id});
      this.userInput = '';
    });

  }

  markAsRead() {
    if (!this.messages[this.messages.length - 1].read && this.messages[this.messages.length - 1].sender === 'received') {
      const idUnreadMessages = this.messages.filter(message => !message.read && message.sender === 'received').map(message => message.id);
      this.messageService.markAsRead(idUnreadMessages).subscribe(data => {
        this.messages.filter(message => !message.read && message.sender === 'received').forEach(message => message.read = true);
      })

    }
  }

  typing() {
    this.messageService.sendIsTypingOrNoNotification(this.emitter, this.recipient, this.userInput).subscribe(data => {
    });
  }

}

