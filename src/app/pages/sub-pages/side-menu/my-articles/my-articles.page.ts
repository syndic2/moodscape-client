import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { Article } from 'src/app/models/article';
import { UserArticlesService } from 'src/app/services/user-articles/user-articles.service';

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.page.html',
  styleUrls: ['./my-articles.page.scss'],
})
export class MyArticlesPage implements OnInit {
  public articles: Article[]= [];
  public finishLoad: boolean= false;
  private getArchivedArticlesListener: Subscription= null;
  private removeArchivedArticlesListener: Subscription= null;

  constructor(private userArticles: UserArticlesService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (this.getArchivedArticlesListener === null) {
      this.getArchivedArticlesListener= this.userArticles.getArchivedArticles().subscribe(res => {
        this.articles= res.articles;
        this.finishLoad= true;
      });
    }
  }

  ionViewWillLeave() {
    this.getArchivedArticlesListener && this.getArchivedArticlesListener.unsubscribe();
    this.removeArchivedArticlesListener && this.removeArchivedArticlesListener.unsubscribe();
  }

  pullRefresh(event) {
    this.finishLoad= false;

    this.getArchivedArticlesListener= this.userArticles.getArchivedArticles().subscribe(res => {
      this.articles= res.articles;
      this.finishLoad= true;

      event && event.target.complete();
    });
  }

  onRemove(article_id: number) {
    this.removeArchivedArticlesListener= this.userArticles.removeArchivedArticles([article_id]).subscribe(res => {
      this.articles= this.articles.filter((article: Article) => article.Id !== article_id);
    });
  }
}
