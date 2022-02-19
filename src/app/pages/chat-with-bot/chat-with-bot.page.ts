import { Component, OnInit, ViewChild } from '@angular/core';

import { IonContent, ModalController } from '@ionic/angular';

import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { transformDateTime } from 'src/app/utilities/helpers';
import { fetchProfile } from 'src/app/store/actions/user.actions';
import { getAuthenticated } from 'src/app/store/selectors/authentication.selectors';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ChatbotService } from 'src/app/services/chatbot/chatbot.service';
import { CalendarPage } from 'src/app/modals/calendar/calendar.page';

@Component({
  selector: 'app-chat-with-bot',
  templateUrl: './chat-with-bot.page.html',
  styleUrls: ['./chat-with-bot.page.scss'],
})
export class ChatWithBotPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;

  public messageText: string = '';
  public messages = new BehaviorSubject<any[]>([]);
  public buttonMessages: { title: string, payload: string }[] = [];
  public dateRangeValuesSubject = new BehaviorSubject<{ startDate: string, endDate: string }>({
    startDate: '',
    endDate: ''
  });
  public isShowDatePicker: boolean = false;
  public isBotTyping: boolean = false;
  private sender: string | number;
  private initiateGreetBotSubscription: Subscription;
  private messagesSubscription: Subscription;
  private dateRangeValuesSubscription: Subscription;
  private sendMessageSubscription: Subscription;

  constructor(
    private store: Store,
    private modalController: ModalController,
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

    this.messagesSubscription = this.messages.subscribe(message => {
      this.content.scrollToBottom(200);
    });

    this.dateRangeValuesSubscription = this.dateRangeValuesSubject.subscribe(value => {
      if (value.startDate !== '' && value.endDate !== '') {
        this.sendMessage(value.startDate + '/' + value.endDate);
      }
    });
  }

  ionViewWillLeave() {
    this.resetMessages();
    this.initiateGreetBotSubscription && this.initiateGreetBotSubscription.unsubscribe();
    this.messagesSubscription && this.messagesSubscription.unsubscribe();
    this.dateRangeValuesSubscription && this.dateRangeValuesSubscription.unsubscribe();
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
    this.messages.next([]);
    this.buttonMessages = [];
    this.dateRangeValuesSubject.next({ startDate: '', endDate: '' });
    this.isShowDatePicker = false;
    this.isBotTyping = false;
  }

  async onOpenCalendar(rangeType: string) {
    const modal = await this.modalController.create({
      component: CalendarPage,
      cssClass: 'auto-height-modal rounded-modal wrapper-fit-content'
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && data.selectedDate) {
      if (rangeType === 'start') {
        this.dateRangeValuesSubject.next({
          ...this.dateRangeValuesSubject.value,
          startDate: transformDateTime(data.selectedDate).toISODate()
        });
      } else if (rangeType === 'end') {
        this.dateRangeValuesSubject.next({
          ...this.dateRangeValuesSubject.value,
          endDate: transformDateTime(data.selectedDate).toISODate()
        });
      }
    }
  }

  sendMessage(messageText: string, buttonMessageTitle: string = '') {
    if (messageText !== '/initiate_bot_greet' && !this.buttonMessages.length) {
      this.messages.next([...this.messages.value, { sender: this.sender, recipient_id: 'BOT', text: messageText }]);
    } else if (buttonMessageTitle !== '') {
      this.messages.next([...this.messages.value, { sender: this.sender, recipient_id: 'BOT', text: buttonMessageTitle }]);
    }

    if (this.isShowDatePicker) {
      messageText = 'datepicker_dates: ' + messageText;
      this.isShowDatePicker = false;
    }

    this.messages.next([...this.messages.value, { isLoading: true }]);
    this.buttonMessages = [];
    this.isBotTyping = true;

    this.sendMessageSubscription = this.chatbotService
      .sendMessage(this.sender, messageText)
      .pipe(takeUntil(this.authenticationService.isLoggedIn))
      .subscribe((res: any[]) => {
        if (res.length) {
          const removeBotTypingIndicator = [...this.messages.value];
          removeBotTypingIndicator.pop();
          this.messages.next(removeBotTypingIndicator);

          res.forEach(message => {
            if (message.custom && message.custom.is_show_datepicker) {
              this.isShowDatePicker = true;
              this.messages.next([...this.messages.value, { sender: 'BOT', recipient_id: this.sender, customActionButton: true }]);
            } else {
              this.messages.next([...this.messages.value, { sender: 'BOT', recipient_id: this.sender, text: message.text }]);
            }
          });
          res.forEach(message => {
            if (message.buttons) {
              this.buttonMessages = message.buttons;
              return;
            }
          });

          this.isBotTyping = false;
        }
      });
  }

  onSendMessage() {
    if (this.messageText && this.messageText.trim()) {
      this.sendMessage(this.messageText);
      this.messageText = '';
    }
  }
}
