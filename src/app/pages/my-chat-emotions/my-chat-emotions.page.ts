import { Component, OnInit, ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import Chart from 'chart.js/auto';

import { poppingAnimation } from 'src/app/animations/utilities.animation';
import { ChatEmotionLog, ChatEmotions } from 'src/app/models/chat-emotions';
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
  @ViewChildren('emotionCard') emotionCards: QueryList<ElementRef>;

  public chatEmotions: ChatEmotions;
  private user: User;
  public selectedChatEmotionLog: ChatEmotionLog[];
  public isTelegramAuthorized: boolean = false;
  public pieChart;

  private getAuthenticatedSubscription: Subscription;
  private getChatEmotionsSubscription: Subscription;
  private connectTelegramSubscription: Subscription;
  private disconnectTelegramSubscription: Subscription;

  constructor(
    private store: Store,
    private modalController: ModalController,
    public utilitiesService: UtilitiesService,
    private authenticationService: AuthenticationService,
    private chatEmotionsService: ChatEmotionsService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.pieChart = new Chart(this.pieChartCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Senang', 'Marah', 'Sedih', 'Takut'],
        datasets: [
          {
            data: [25, 10, 45, 20],
            backgroundColor: [
              '#3CB403',
              '#D0312D',
              '#FFD300',
              '#0077B6'
            ]
          }
        ]
      }
    });
  }

  ionViewWillEnter() {
    this.utilitiesService.onSkeletonLoading.next(true);

    this.getAuthenticatedSubscription = this.store
      .select(getAuthenticated)
      .pipe(takeUntil(this.authenticationService.isLoggedIn))
      .subscribe(user => {
        if (!user) {
          this.store.dispatch(fetchProfile({ skipLoading: false }));
        } else {
          this.user = { ...user };
          this.getChatEmotionsSubscription = this.chatEmotionsService.getChatEmotions(this.user.Id)
            .pipe(takeUntil(this.authenticationService.isLoggedIn))
            .subscribe(res => {
              if (res?.is_authorized === false) {
                this.isTelegramAuthorized = false;
              } else {
                this.isTelegramAuthorized = true;
                //get emotions data
              }

              this.utilitiesService.onSkeletonLoading.next(false);
            });
        }
      });
  }

  ionViewWillLeave() {
    this.getAuthenticatedSubscription && this.getAuthenticatedSubscription.unsubscribe();
    this.getChatEmotionsSubscription && this.getChatEmotionsSubscription.unsubscribe();
    this.connectTelegramSubscription && this.connectTelegramSubscription.unsubscribe();
    this.disconnectTelegramSubscription && this.disconnectTelegramSubscription.unsubscribe();
  }

  async onConnectTelegram() {
    const modal = await this.modalController.create({ component: InputPhoneNumberPage });
    modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && data.phone) {
      const phone = data.phone;

      this.connectTelegramSubscription = this.chatEmotionsService.connectTelegram(this.user?.Id, data.phone)
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
    }
  }

  onDisconnectTelegram() {
    this.disconnectTelegramSubscription = this.chatEmotionsService.disconnectTelegram(this.user?.Id)
      .pipe(takeUntil(this.authenticationService.isLoggedIn))
      .subscribe(() => {
        this.isTelegramAuthorized = false;
      });
  }

  onSelectEmotion(index: number) {
    poppingAnimation('emotion-card', this.emotionCards.get(index)).play();

    if (index === 0) {

    } else if (index === 1) {

    } else if (index === 2) {

    } else if (index === 3) {

    }
  }
}
