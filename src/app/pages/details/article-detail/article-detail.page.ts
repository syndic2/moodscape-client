import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ToastController } from '@ionic/angular';

import { Subscription } from 'rxjs';

import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article/article.service';
import { UserArticlesService } from 'src/app/services/user-articles/user-articles.service';

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
    private articleService: ArticleService,
    private userArticlesService: UserArticlesService
  ) { }

	ngOnInit() {
    this.urlName= this.activatedRoute.snapshot.paramMap.get('urlName');
  }

	ionViewWillEnter() {
    if (this.getArticleListener === null) {
      this.getArticleListener= this.articleService.getOneByUrlName(this.urlName).subscribe((res: Article) => this.article = res);
    }
	}

	ionViewWillLeave() {
		this.getArticleListener.unsubscribe();
	}

  pullRefresh(event) {
    this.getArticleListener= this.articleService.getOneByUrlName(this.urlName).subscribe((res: Article) => {
      this.article = res;

      event && event.target.complete();
    });
  }

  onArchive() {
    this.userArticlesService.archiveArticles([this.article.Id]).subscribe(async res => {
      const toast= await this.toastController.create({
        message: res.response.text,
        position: 'bottom',
        duration: 2000
      });

      toast.present();
    });
  }
}
