import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { MoodEmoticon } from 'src/app/models/mood.model';
import { showAlert, showRequestErrorModal } from 'src/app/store/actions/application.actions';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';

@Component({
  selector: 'app-app-feedback',
  templateUrl: './app-feedback.page.html',
  styleUrls: ['./app-feedback.page.scss'],
})
export class AppFeedbackPage implements OnInit {
  public feedbackForm: FormGroup;
  private sendFeedbackSubscription: Subscription;
  private rating: number= 0;

  constructor(private store: Store, private feedbackService: FeedbackService) { }

  ngOnInit() {
    this.feedbackForm= new FormGroup({
      review: new FormControl(''),
      featureCategory: new FormControl('')
    });
  }

  ionViewWillLeave() {
    this.sendFeedbackSubscription && this.sendFeedbackSubscription.unsubscribe();
  }
  
  get review() {
    return this.feedbackForm.get('review');
  }

  get featureCategory() {
    return this.feedbackForm.get('featureCategory');
  }

  onSelectEmoticon(emoticon: MoodEmoticon) {
    this.rating= emoticon.value;
  }

  async onSubmit() {
    if (this.rating === 0) {
      this.store.dispatch(showAlert({
        options: {
          message: 'Nilai rating tidak boleh kosong!',
          buttons: ['OK']
        } 
      }));
    } else {
      this.sendFeedbackSubscription= this.feedbackService.sendAppFeedback({ rating: this.rating, ...this.feedbackForm.value }).subscribe(async res => {
        if (!res.response.status) {
          this.store.dispatch(showRequestErrorModal({ message: res.response.text }));
        } else {
          this.store.dispatch(showAlert({
            options: {
              message: 'Ulasan anda berhasil terkirim. Terima kasih telah memberikan ulasan!',
              buttons: ['OK']
            } 
          }));
        }
      });
    }
  }
}
