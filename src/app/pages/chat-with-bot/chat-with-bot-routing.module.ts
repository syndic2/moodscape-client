import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatWithBotPage } from './chat-with-bot.page';

const routes: Routes = [
  {
    path: '',
    component: ChatWithBotPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatWithBotPageRoutingModule {}
