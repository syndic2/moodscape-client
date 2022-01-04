import { Component, OnInit, ViewChild } from '@angular/core';

import { IonContent } from '@ionic/angular';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fetchProfile } from 'src/app/store/actions/user.actions';
import { getAuthenticated } from 'src/app/store/selectors/authentication.selectors';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ChatbotService } from 'src/app/services/chatbot/chatbot.service';

@Component({
  selector: 'app-chat-with-bot',
  templateUrl: './chat-with-bot.page.html',
  styleUrls: ['./chat-with-bot.page.scss'],
})
export class ChatWithBotPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;

  public messageText: string = '';
  public messages: any[] = [];
  public buttonMessages: any[] = [];
  public isBotTyping: boolean = false;
  private sender: string | number;
  private initiateGreetBotSubscription: Subscription;
  private sendMessageSubscription: Subscription;

  constructor(
    private store: Store,
    private authenticationService: AuthenticationService,
    private chatbotService: ChatbotService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.store
      .select(getAuthenticated)
      .pipe(takeUntil(this.authenticationService.isLoggedIn))
      .subscribe(res => {
        if (!res) {
          this.store.dispatch(fetchProfile({ skipLoading: false }));
        } else {
          this.sender = res.Id;
          this.sendMessage('/initiate_bot_greet');
        }
      });
  }

  ionViewWillLeave() {
    this.resetMessages();
    this.initiateGreetBotSubscription && this.initiateGreetBotSubscription.unsubscribe();
    this.sendMessageSubscription && this.sendMessageSubscription.unsubscribe();
  }

  pullRefresh(event) {
    this.store.dispatch(fetchProfile({ skipLoading: false }));
    event.target.complete();
  }

  logScrolling(event) {
  }

  resetMessages() {
    this.messageText = '';
    this.messages = [];
    this.buttonMessages = [];
    this.isBotTyping = false;
  }

  sendMessage(messageText: string, buttonMessageTitle: string = '') {
    if (messageText !== '/initiate_bot_greet' && !this.buttonMessages.length)
      this.messages.push({ sender: this.sender, recipient_id: 'BOT', text: messageText });
    else if (buttonMessageTitle !== '')
      this.messages.push({ sender: this.sender, recipient_id: 'BOT', text: buttonMessageTitle });

    if (this.buttonMessages.length)
      this.buttonMessages = [];

    this.messages.push({ isLoading: true });
    this.isBotTyping = true;

    this.sendMessageSubscription = this.chatbotService
      .sendMessage(this.sender, messageText)
      .pipe(takeUntil(this.authenticationService.isLoggedIn))
      .subscribe((res: any[]) => {
        if (res.length) {
          this.messages.pop();
          this.messages = [...this.messages, ...res.map(message => ({ sender: 'BOT', ...message }))];
          this.isBotTyping = false;
          this.content.scrollToBottom(200);

          res.forEach(message => {
            if (message.buttons) {
              this.buttonMessages = message.buttons;
              return;
            }
          });
        }
      });
  }

  onSendMessage() {
    if (this.messageText && this.messageText.trim()) {
      this.sendMessage(this.messageText);
      this.messageText = '';
      this.content.scrollToBottom(200);

      //this.messages.push({ sender: this.sender, recipient_id: 'BOT', text: this.messageText });
      //this.messages.push({ isLoading: true });

      //this.sendMessageSubscription= this.chatbotService
      //  .sendMessage(this.sender, this.messageText)
      //  .pipe(takeUntil(this.authenticationService.isLoggedIn))
      //  .subscribe((res: any[]) => {
      //  if (res.length) {
      //    this.messages.pop();
      //    this.messages= [...this.messages, ...res.map(message => ({ sender: 'BOT', ...message }))];
      //    this.content.scrollToBottom(200);
      //  }
      //});

      //this.messageText= '';
      //this.content.scrollToBottom(200);
    }
  }
}
