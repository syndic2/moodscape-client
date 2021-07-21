import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ToastController } from '@ionic/angular';

import { Subscription } from 'rxjs';

import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article/article.service';

@Component({
	selector: 'app-article-detail',
	templateUrl: './article-detail.page.html',
	styleUrls: ['./article-detail.page.scss'],
})
export class ArticleDetailPage implements OnInit {
	public article: Article;
  private urlName: string;
	private getArticleListener: Subscription= null;

	constructor(
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private articleService: ArticleService
  ) { }

	ngOnInit() {
    this.urlName= this.activatedRoute.snapshot.paramMap.get('urlName');
  }

	ionViewWillEnter() {
    this.getArticleListener= this.articleService.getArticleByUrlName(this.urlName).subscribe((res: Article) => this.article = res);
	}

	ionViewWillLeave() {
		this.getArticleListener.unsubscribe();
	}

  pullRefresh(event) {
    this.getArticleListener= this.articleService.getArticleByUrlName(this.urlName).subscribe((res: Article) => {
      this.article = res;

      event && event.target.complete();
    });
  }

  onArchive() {
    this.articleService.archiveArticles([this.article.Id]).subscribe(async res => {
      const toast= await this.toastController.create({
        message: res.response.text,
        position: 'bottom',
        duration: 2000
      });

      toast.present();
    });
  }
}
