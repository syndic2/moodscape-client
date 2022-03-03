import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from 'src/app/store/effects/user.effects';

import { ChatWithBotPageRoutingModule } from './chat-with-bot-routing.module';
import { ChatWithBotPage } from './chat-with-bot.page';
import { BubbleChatComponent } from 'src/app/components/pages/chat-with-bot/bubble-chat/bubble-chat.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EffectsModule.forFeature([UserEffects]),
    ChatWithBotPageRoutingModule
  ],
  declarations: [
    ChatWithBotPage,
    BubbleChatComponent
  ]
})
export class ChatWithBotPageModule { }
