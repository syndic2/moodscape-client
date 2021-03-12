import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.page.html',
  styleUrls: ['./side-menu.page.scss'],
})
export class SideMenuPage implements OnInit {
  pages: Object= [
    {
      title: 'Beranda',
      url: '/side-menu/tabs',
      icon: 'home'
    },
    {
      title: 'Profil',
      url: '/side-menu/profile',
      icon: 'person-circle-outline'
    },
    {
      title: 'Artikel saya',
      url: '/side-menu/my-articles',
      icon: 'newspaper-outline'
    },
    {
      title: 'Pengaturan',
      url: '/side-menu/settings',
      icon: 'cog-outline'
    },
    {
      title: 'Keluar',
      url: '/',
      icon: 'exit-outline'
    }
  ];

  constructor() { }

  ngOnInit() {
  }
}
