import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { fetchLogout } from 'src/app/store/actions/authentication.actions';

@Component({
	selector: 'app-side-menu',
	templateUrl: './side-menu.page.html',
	styleUrls: ['./side-menu.page.scss'],
})
export class SideMenuPage implements OnInit {
	public pages: any[] = [
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
			title: 'Artikel Saya',
			url: '/side-menu/my-articles',
			icon: 'newspaper-outline'
		},
		{
			title: 'Pengaturan',
			url: '/side-menu/settings',
			icon: 'cog-outline'
		}
	];

	constructor(private store: Store) { }

	ngOnInit() { }

	onLogout() {
    this.store.dispatch(fetchLogout());
	}
}
