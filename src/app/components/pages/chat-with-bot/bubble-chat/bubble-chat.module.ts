import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { BubbleChatComponent } from './bubble-chat.component';
import { SafeUrlPipe } from 'src/app/pipes/safe-url/safe-url.pipe';

@NgModule({
  declarations: [BubbleChatComponent, SafeUrlPipe],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [BubbleChatComponent]
})
export class BubbleChatModule { }
