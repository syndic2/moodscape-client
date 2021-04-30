import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

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
			title: 'Artikel saya',
			url: '/side-menu/my-articles',
			icon: 'newspaper-outline'
		},
		{
			title: 'Pengaturan',
			url: '/side-menu/settings',
			icon: 'cog-outline'
		}
	];

	constructor(private router: Router, private authService: AuthenticationService) { }

	ngOnInit() { }

	onLogout() {
		this.authService.logout().subscribe(() => this.router.navigate(['/'], { replaceUrl: true }));
	}
}
