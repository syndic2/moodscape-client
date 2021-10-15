import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyChatEmotionsPage } from './my-chat-emotions.page';

const routes: Routes = [
  {
    path: '',
    component: MyChatEmotionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyChatEmotionsPageRoutingModule {}
