import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Chart from 'chart.js/auto';

// import { poppingAnimation } from 'src/app/animations/utilities.animation';
import { User } from 'src/app/models/user.model';
import { fetchProfile } from 'src/app/store/actions/user.actions';
import { getAuthenticated } from 'src/app/store/selectors/authentication.selectors';
import { ChatEmotionsService } from 'src/app/services/chat-emotions/chat-emotions.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { InputPhoneNumberPage } from 'src/app/modals/one-time-password/input-phone-number/input-phone-number.page';
import { InputOTPCodePage } from 'src/app/modals/one-time-password/input-otp-code/input-otp-code.page';

@Component({
  selector: 'app-my-chat-emotions',
  templateUrl: './my-chat-emotions.page.html',
  styleUrls: ['./my-chat-emotions.page.scss'],
})
export class MyChatEmotionsPage implements OnInit {
  @ViewChild('pieChartCanvas', { static: false }) pieChartCanvas: ElementRef;
  // @ViewChildren('emotionCard') emotionCards: QueryList<ElementRef>;

  public chatEmotions: {} = {};
  public emotionLabels: any = {
    angry: 'Marah',
    fear: 'Takut',
    happy: 'Senang',
    sad: 'Sedih',
    surprise: 'Terkejut'
  };
  private user: User;
  public isTelegramAuthorized: boolean = false;
  public pieChart: any;
  private subscriptions: Subscription;

  constructor(
    private store: Store,
    private modalController: ModalController,
    public utilitiesService: UtilitiesService,
    private authenticationService: AuthenticationService,
    private chatEmotionsService: ChatEmotionsService
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.pieChart = new Chart(this.pieChartCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Marah', 'Takut', 'Senang', 'Sedih', 'Terkejut'],
        datasets: [
          {
            data: [],
            backgroundColor: [
              '#FF0000',
              '#008000',
              '#F0E68C',
              '#4682B4',
              '#6495ED'
            ]
          }
        ]
      }
    });
  }

  ionViewWillEnter() {
    this.subscriptions = new Subscription();
    this.utilitiesService.onSkeletonLoading.next(true);

    const getAuthenticatedSubscription = this.store
      .select(getAuthenticated)
      .pipe(takeUntil(this.authenticationService.isLoggedIn))
      .subscribe(user => {
        if (!user) {
          this.store.dispatch(fetchProfile({ skipLoading: false }));
        } else {
          this.user = { ...user };
          this.processData();
        }
      });
    this.subscriptions.add(getAuthenticatedSubscription);
  }

  ionViewWillLeave() {
    this.subscriptions.unsubscribe();
  }

  processData() {
    const getChatEmotionsSubscription = this.chatEmotionsService.getChatEmotions(this.user.Id)
      .pipe(takeUntil(this.authenticationService.isLoggedIn))
      .subscribe(res => {
        if (res?.is_authorized === false) {
          this.isTelegramAuthorized = false;
        } else {
          this.isTelegramAuthorized = true;

          this.pieChart.data.datasets[0].data = [];
          if (res.chat_emotions.emotions_total) {
            Object.entries(res.chat_emotions.emotions_total).forEach(([key, value]) => this.pieChart.data.datasets[0].data.push(value));
          }
          this.pieChart.update();

          this.chatEmotions = res.chat_emotions.messages.reduce((group: any, message: any) => {
            const { first_name } = message.chat_with;
            group[first_name] = group[first_name] ?? [];
            group[first_name].push({ data: message.data, emotions: message.emotions });
            group[first_name].sort((a: any, b: any) => new Date(a.data.timestamps) > new Date(b.data.timestamps) ? 1 : -1);

            return group;
          }, {});
        }

        this.utilitiesService.onSkeletonLoading.next(false);
      });
    this.subscriptions.add(getChatEmotionsSubscription);
  }

  async onConnectTelegram() {
    const modal = await this.modalController.create({ component: InputPhoneNumberPage });
    modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && data.phone) {
      const phone = data.phone;

      const connectTelegramSubscription = this.chatEmotionsService.connectTelegram(this.user?.Id, data.phone)
        .pipe(takeUntil(this.authenticationService.isLoggedIn))
        .subscribe(async res => {
          const modal = await this.modalController.create({
            component: InputOTPCodePage,
            componentProps: {
              userId: this.user?.Id,
              phone: phone,
              phoneCodeHash: res?.phone_code_hash
            }
          });
          modal.present();

          const { data } = await modal.onWillDismiss();
          if (data && data.isSuccess === true) {
            this.isTelegramAuthorized = true;
          }
        });
      this.subscriptions.add(connectTelegramSubscription);
    }
  }

  onDisconnectTelegram() {
    const disconnectTelegramSubscription = this.chatEmotionsService.disconnectTelegram(this.user?.Id)
      .pipe(takeUntil(this.authenticationService.isLoggedIn))
      .subscribe(() => {
        this.isTelegramAuthorized = false;
        this.chatEmotions = {};
      });
    this.subscriptions.add(disconnectTelegramSubscription);
  }

  // onSelectEmotion(index: number) {
  //   poppingAnimation('emotion-card', this.emotionCards.get(index)).play();

  //   if (index === 0) {

  //   } else if (index === 1) {

  //   } else if (index === 2) {

  //   } else if (index === 3) {

  //   }
  // }
}
