import { Component, OnInit, Input, QueryList, ViewChild, ViewChildren, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { poppingAnimation } from 'src/app/animations/utilities.animation';
import { ChatEmotionsService } from 'src/app/services/chat-emotions/chat-emotions.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-input-otp-code',
  templateUrl: './input-otp-code.page.html',
  styleUrls: ['./input-otp-code.page.scss'],
})
export class InputOTPCodePage implements OnInit {
  @Input() userId: string;
  @Input() phone: string;
  @Input() phoneCodeHash: string;
  @ViewChildren('numberButton') numberButtons: QueryList<ElementRef>;
  @ViewChild('deleteInputButton', { static: true }) deleteInputButton: ElementRef;

  public OTPcodeSubject: BehaviorSubject<string> = new BehaviorSubject('');
  private getOTPcodeSubscription: Subscription;
  private verifyOTPSubscription: Subscription;

  constructor(
    private modalController: ModalController,
    private chatEmotionsService: ChatEmotionsService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getOTPcodeSubscription = this.OTPcodeSubject.subscribe(code => {
      if (code.length === 5) {
        this.verifyOTPSubscription = this.chatEmotionsService.telegramOTPVerification(this.userId, this.phone, this.phoneCodeHash, this.OTPcodeSubject.value)
          .pipe(takeUntil(this.authenticationService.isLoggedIn))
          .subscribe(res => {
            if (res.is_two_step_verification && res.is_two_step_verification === true) this.modalController.dismiss({ isTwoStepVerification: true });
            else if (res.verify_success && res.verify_success === true) this.modalController.dismiss({ isSuccess: true });
          });
        this.OTPcodeSubject.next('');
      }
    });
  }

  ionViewWillLeave() {
    this.getOTPcodeSubscription && this.getOTPcodeSubscription.unsubscribe();
    this.verifyOTPSubscription && this.verifyOTPSubscription.unsubscribe();
  }

  close() {
    this.modalController.dismiss();
  }

  onPressNumber(number: any, index: number) {
    if (index !== 9) {
      poppingAnimation('number-button', this.numberButtons.get(index)).play();

      if (this.OTPcodeSubject.value.length < 5) {
        this.OTPcodeSubject.next(this.OTPcodeSubject.value + number);
      }
    }
  }

  onDeleteNumberInput() {
    poppingAnimation('delete-input-button', this.deleteInputButton).play().finally(() => {
      this.OTPcodeSubject.next(this.OTPcodeSubject.value.slice(0, -1));
    });
  }

  // onResendOTP() {

  // }
}
