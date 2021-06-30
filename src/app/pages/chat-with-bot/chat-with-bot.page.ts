import { Component, OnInit, ViewChild } from '@angular/core';

import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-chat-with-bot',
  templateUrl: './chat-with-bot.page.html',
  styleUrls: ['./chat-with-bot.page.scss'],
})
export class ChatWithBotPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;

  public dummyMessages= [
    {
      user: 'BOT',
      text: 'Selamat pagi Jonathan, apa kabar?'
    },
    {
      user: 'Me',
      text: 'Baik.'
    },
    {
      user: 'Apakah ada dipikiranmu yang menganggu?',
      text: 'Saya merasa tidak enak semenjak bangun ini :('
    }
  ];
  public messageText: string= '';
  public loadingBubble: boolean= false;

  constructor() { }

  ngOnInit() {
  }

  logScrolling(event) {
    console.log('event', event);
  }
  
  onSendMessage() {
    if (this.messageText && this.messageText.trim()) {
      const sendedMessage= {
        user: 'Me',
        text: this.messageText
      };
      const repliedMessage= {
        user: 'BOT',
        text: 'dummy text reply from BOT :)',
        isLoading: true
      };

      this.dummyMessages= [...this.dummyMessages, ...[sendedMessage, repliedMessage]];
      this.messageText= '';
      this.content.scrollToBottom(200);

      setTimeout(() => {
        repliedMessage.isLoading= false;
        this.content.scrollToBottom(200);
      }, 2000);
    }
  }
}
