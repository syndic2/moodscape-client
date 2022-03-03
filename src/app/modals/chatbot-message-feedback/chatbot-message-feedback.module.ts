import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ChatbotMessageFeedbackPage } from './chatbot-message-feedback.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [ChatbotMessageFeedbackPage]
})
export class ChatbotMessageFeedbackPageModule {
  static getComponent(): typeof ChatbotMessageFeedbackPage {
    return ChatbotMessageFeedbackPage;
  }
}
