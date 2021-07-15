import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AlertController, ToastController } from '@ionic/angular';

import { Subscription } from 'rxjs';

import { Emoticon } from 'src/app/models/mood.model';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';

@Component({
  selector: 'app-app-feedback',
  templateUrl: './app-feedback.page.html',
  styleUrls: ['./app-feedback.page.scss'],
})
export class AppFeedbackPage implements OnInit {
  public feedbackForm: FormGroup;
  private submitFeedbackListener: Subscription;
  private rating: number= 0;

  constructor(
		private alertController: AlertController,
		private toastController: ToastController,
    private feedbackService: FeedbackService
  ) { }

  ngOnInit() {
    this.feedbackForm= new FormGroup({
      review: new FormControl(''),
      featureCategory: new FormControl('')
    });
  }

  ionViewWillLeave() {
    this.submitFeedbackListener && this.submitFeedbackListener.unsubscribe();
  }
  
  get review() {
    return this.feedbackForm.get('review');
  }

  get featureCategory() {
    return this.feedbackForm.get('featureCategory');
  }

  onSelectEmoticon(emoticon: Emoticon) {
    this.rating= emoticon.value;
  }

  async onSubmit() {
    const alert= await this.alertController.create({ buttons: ['OK'] });

    if (this.rating === 0) {
      alert.message= 'Nilai rating tidak boleh kosong!';
      alert.present();
    } else {
      this.feedbackService.sendAppFeedback({ rating: this.rating, ...this.feedbackForm.value }).subscribe(async res => {
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
