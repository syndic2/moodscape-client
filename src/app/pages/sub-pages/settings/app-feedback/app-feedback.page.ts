import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AlertController, ToastController } from '@ionic/angular';

import { Subscription } from 'rxjs';

import { FeedbackService } from 'src/app/services/feedback/feedback.service';

@Component({
  selector: 'app-app-feedback',
  templateUrl: './app-feedback.page.html',
  styleUrls: ['./app-feedback.page.scss'],
})
export class AppFeedbackPage implements OnInit {
  public feedbackForm: FormGroup;
  public errorMessages= {
    rating: [
      { type: 'required', message: 'Nilai rating tidak boleh kosong.' }
    ]
  };
  public rates= [
    { value: 5, emoticon: 'icons/svg/emoticons/smiling.svg' },
    { value: 4, emoticon: 'icons/svg/emoticons/smile.svg' },
    { value: 3, emoticon: 'icons/svg/emoticons/neutral.svg' },
    { value: 2, emoticon: 'icons/svg/emoticons/sad.svg' },
    { value: 1, emoticon: 'icons/svg/emoticons/angry.svg' },
  ];
  private submitFeedbackListener: Subscription;


  constructor(
		private alertController: AlertController,
		private toastController: ToastController,
    private feedbackService: FeedbackService
  ) { }

  ngOnInit() {
    this.feedbackForm= new FormGroup({
      rating: new FormControl('', [Validators.required]),
      review: new FormControl(''),
      featureCategory: new FormControl('')
    });
  }

  ionViewWillLeave() {
    this.submitFeedbackListener && this.submitFeedbackListener.unsubscribe();
  }

  get rating() {
    return this.feedbackForm.get('rating');
  }

  get review() {
    return this.feedbackForm.get('review');
  }

  get featureCategory() {
    return this.feedbackForm.get('featureCategory');
  }

  async onSubmit() {
    const alert= await this.alertController.create({ buttons: ['OK'] });

    if (this.feedbackForm.invalid) {
      alert.message= 'Nilai rating tidak boleh kosong!';
      alert.present();
    } else {
      this.feedbackService.sendAppFeedback(this.feedbackForm.value).subscribe(async res => {
        if (!res.response.status) {
          const toast= await this.toastController.create({
            message: res.response.text,
            position: 'top',
            duration: 2000
          });
          toast.present();
        } else {
          alert.message= 'Ulasan anda berhasil terkirim. Terima kasih telah memberikan ulasan!';
          alert.present();
        }
      });
    }
  }
}
