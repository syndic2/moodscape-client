import { Component, OnInit, Input } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

import { FeedbackService } from 'src/app/services/feedback/feedback.service';

@Component({
  selector: 'app-chatbot-message-feedback',
  templateUrl: './chatbot-message-feedback.page.html',
  styleUrls: ['./chatbot-message-feedback.page.scss'],
})
export class ChatbotMessageFeedbackPage implements OnInit {
  public review: string = '';

  @Input() botMessage: any;
  @Input() messages: any[] = [];

  constructor(
    private alertController: AlertController,
    private modalController: ModalController,
    private feedbackService: FeedbackService
  ) { }

  ngOnInit() {
  }

  close() {
    this.modalController.dismiss();
  }

  onSend() {
    const fields = {
      review: this.review,
      botMessage: this.botMessage,
      messages: this.messages
    };

    this.modalController.dismiss();
    this.feedbackService.sendChatbotFeedback(fields).subscribe(async res => {
      const { response } = res;

      if (response.status) {
        const alert = await this.alertController.create({ message: response.text, buttons: ['OK'] });
        alert.present();
      }
    });
  }
}
