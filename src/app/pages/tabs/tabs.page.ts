import { Component, OnInit } from '@angular/core';

import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  constructor(private utilitiesService: UtilitiesService) { }

  ngOnInit() {
  }

  onOpenAddMenu() {
    this.utilitiesService.onBackdrop.next(!this.utilitiesService.onBackdrop.getValue());
  }
}
