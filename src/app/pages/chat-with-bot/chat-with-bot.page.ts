import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { v4 as uuidV4 } from 'uuid';

import { transformDateTime } from 'src/app/utilities/helpers';
import { fetchProfile } from 'src/app/store/actions/user.actions';
import { getAuthenticated } from 'src/app/store/selectors/authentication.selectors';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ChatbotService } from 'src/app/services/chatbot/chatbot.service';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-chat-with-bot',
  templateUrl: './chat-with-bot.page.html',
  styleUrls: ['./chat-with-bot.page.scss'],
})
export class ChatWithBotPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;

  public messageText: string;
  public messages = new BehaviorSubject<any[]>([]);
  public buttonMessages: { title: string, payload: string }[] = [];
  public dateRangeValuesSubject = new BehaviorSubject<{ startDate: string, endDate: string }>({ startDate: '', endDate: '' });
  public isShowDatePicker: boolean = false;
  public isShowVideo: boolean = false;
  public isBotTyping: boolean = false;
  private sender: string | number;
  private subscriptions: Subscription;

  constructor(
    private store: Store,
    private authenticationService: AuthenticationService,
    private chatbotService: ChatbotService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.messageText = '';
    this.messages.next([]);
    this.buttonMessages = [];
    this.dateRangeValuesSubject.next({ startDate: '', endDate: '' });
    this.isShowDatePicker = false;
    this.isShowVideo = false;
    this.isBotTyping = false;
    this.subscriptions = new Subscription();

    const getAuthenticatedSubscription = this.store
      .select(getAuthenticated)
      .pipe(takeUntil(this.authenticationService.isLoggedIn))
      .subscribe(res => {
        if (!res) {
          this.store.dispatch(fetchProfile({ skipLoading: false }));
        } else {
          this.sender = res.Id;
          this.sendMessage('initiate_bot_greet');
        }
      });
    this.subscriptions.add(getAuthenticatedSubscription);

    const messagesSubscription = this.messages.subscribe(message => this.content.scrollToBottom(200));
    this.subscriptions.add(messagesSubscription);

    const dateRangeValuesSubscription = this.dateRangeValuesSubject.subscribe(value => {
      if (value.startDate !== '' && value.endDate !== '') {
        this.sendMessage(value.startDate + '/' + value.endDate);
      }
    });
    this.subscriptions.add(dateRangeValuesSubscription);
  }

  ionViewWillLeave() {
    this.subscriptions.unsubscribe();
  }

  pullRefresh(event) {
    this.store.dispatch(fetchProfile({ skipLoading: false }));
    event.target.complete();
  }

  async onOpenCalendar(rangeType: string) {
    const { CalendarPageModule } = await import('../../modals/calendar/calendar.module');
    const modal = await this.modalService.open({
      component: CalendarPageModule.getComponent(),
      cssClass: 'auto-height-modal rounded-modal wrapper-fit-content'
    });
    const { data } = modal;

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

  async onSelectMessage(message: any) {
    const { ChatbotMessageFeedbackPageModule } = await import('../../modals/chatbot-message-feedback/chatbot-message-feedback.module');
    const selectedIndex = [...this.messages.value].findIndex(object => object.Id === message.Id);
    const slicedMessages = [...this.messages.value].slice(0, selectedIndex + 1).map(message => ({
      Id: message.Id,
      sender: message.sender,
      recipientId: message.recipientId,
      text: message.text,
      videoUrl: message.videoUrl
    }));

    await this.modalService.open({
      component: ChatbotMessageFeedbackPageModule.getComponent(),
      componentProps: { botMessage: message, messages: slicedMessages },
      cssClass: 'auto-height-modal rounded-modal wrapper-fit-content'
    });
  }

  sendMessage(messageText: string, buttonTitle?: string) {
    if (messageText !== 'initiate_bot_greet' && !buttonTitle) {
      this.messages.next([
        ...this.messages.value,
        { Id: uuidV4(), sender: this.sender, recipientId: 'BOT', text: messageText }
      ]);
    } else if (buttonTitle && buttonTitle !== '') {
      this.messages.next([
        ...this.messages.value,
        { Id: uuidV4(), sender: this.sender, recipientId: 'BOT', text: buttonTitle }
      ]);
    }

    if (this.isShowDatePicker) {
      messageText = 'datepicker_dates: ' + messageText;
      this.isShowDatePicker = false;
    }

    if (this.isShowVideo) {
      this.isShowVideo = false;
    }

    this.messages.next([...this.messages.value, { isLoading: true }]);
    this.buttonMessages = [];
    this.isBotTyping = true;

    const sendMessageSubscription = this.chatbotService
      .sendMessage(this.sender, messageText)
      .pipe(takeUntil(this.authenticationService.isLoggedIn))
      .subscribe((res: any[]) => {
        const removeBotTypingIndicator = [...this.messages.value];
        removeBotTypingIndicator.pop();
        this.messages.next(removeBotTypingIndicator);

        if (res.length) {
          res.forEach(message => {
            if (message.custom) {
              if (message.custom.is_show_datepicker) {
                this.isShowDatePicker = true;
                this.messages.next([
                  ...this.messages.value,
                  { Id: uuidV4(), sender: 'BOT', recipientId: this.sender, customActionButton: true }
                ]);
              } else if (message.custom.is_show_video) {
                this.isShowVideo = true;
                this.messages.next([
                  ...this.messages.value,
                  { Id: uuidV4(), sender: 'BOT', recipientId: this.sender, customShowVideo: true, videoUrl: message.custom.video_url }
                ]);
              }
            } else {
              this.messages.next([
                ...this.messages.value,
                { Id: uuidV4(), sender: 'BOT', recipientId: this.sender, text: message.text }
              ]);
            }
          });

          res.forEach(message => {
            if (message.buttons) {
              this.buttonMessages = message.buttons;
              return;
            }
          });
        } else {
          if (messageText === '/restart') {
            this.messages.next([
              ...this.messages.value,
              { Id: uuidV4(), sender: 'BOT', recipientId: this.sender, text: 'Percakapan dengan BOT telah di-reset, percakapan akan diulang kembali dari awal.' }
            ]);
            this.sendMessage('initiate_bot_greet');
          }
        }

        this.isBotTyping = false;
      });
    this.subscriptions.add(sendMessageSubscription);
  }

  onSendMessage() {
    if (this.messageText && this.messageText.trim()) {
      this.sendMessage(this.messageText);
      this.messageText = '';
    }
  }
}
