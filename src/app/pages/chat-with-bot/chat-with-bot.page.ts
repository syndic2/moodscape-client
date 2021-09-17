import { Component, OnInit, ViewChild } from '@angular/core';

import { IonContent } from '@ionic/angular';

import { Store } from '@ngrx/store';
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

  public messages: any[]= [];
  private sender: string | number;
  public messageText: string= '';

  constructor(private store: Store, private authenticationService: AuthenticationService, private chatbotService: ChatbotService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.store
      .select(getAuthenticated)
      .pipe(takeUntil(this.authenticationService.isLoggedIn))
      .subscribe(res => {
      if (res) {
        this.sender= res.Id;
      }
    });
  }

  pullRefresh(event) {
    this.store.dispatch(fetchProfile());
    event.target.complete();
  }

  logScrolling(event) {
  }

  onSendMessage() {
    if (this.messageText && this.messageText.trim()) {
      this.messages.push({ sender: this.sender, recipient_id: 'BOT', text: this.messageText });
      this.messages.push({ isLoading: true });

      this.chatbotService.sendMessage(this.sender, this.messageText).subscribe((res: any[]) => {
        if (res.length) {
          this.messages.pop();
          this.messages= [...this.messages, ...res.map(message => ({ sender: 'BOT', ...message }))];
          this.content.scrollToBottom(200);
        }
      });

      this.messageText= '';
      this.content.scrollToBottom(200);
    }
  }
}
