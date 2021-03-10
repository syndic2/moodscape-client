import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  pages: Object= [
    {
      title: 'Beranda',
      url: '/main/home',
      icon: 'home'
    },
    {
      title: 'Profil',
      url: '/main/profile',
      icon: 'person-circle-outline'
    },
    {
      title: 'Artikel saya',
      url: '/main/my-articles',
      icon: 'newspaper-outline'
    },
    {
      title: 'Pengaturan',
      url: '/main/settings',
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
