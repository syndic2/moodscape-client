import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ChatEmotionsService } from 'src/app/services/chat-emotions/chat-emotions.service';

@Component({
  selector: 'app-two-step-verification',
  templateUrl: './two-step-verification.page.html',
  styleUrls: ['./two-step-verification.page.scss'],
})
export class TwoStepVerificationPage implements OnInit, OnDestroy {
  @Input() userId: string;
  @Input() phone: string;

  public password: string;
  private twoStepVerificationSubscription: Subscription;

  constructor(
    private modalController: ModalController,
    private authenticationService: AuthenticationService,
    private chatEmotionService: ChatEmotionsService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.twoStepVerificationSubscription && this.twoStepVerificationSubscription.unsubscribe();
  }

  onSubmit() {
    this.twoStepVerificationSubscription = this.chatEmotionService.telegramTwoStepVerification(this.userId, this.phone, this.password)
      .pipe(takeUntil(this.authenticationService.isLoggedIn))
      .subscribe(res => {
        if (res.verify_success && res.verify_success === true) this.modalController.dismiss({ isSuccess: true });
      });
  }

  onClose() {
    this.modalController.dismiss();
  }
}
