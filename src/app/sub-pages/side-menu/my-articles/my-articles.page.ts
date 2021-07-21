import { Component, OnInit } from '@angular/core';

import { AlertController } from '@ionic/angular';

import { Subscription } from 'rxjs';

import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article/article.service';

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.page.html',
  styleUrls: ['./my-articles.page.scss'],
})
export class MyArticlesPage implements OnInit {
  public articles: Article[]= [];
  public isLoading: boolean= true;
  private getArchivedArticlesListener: Subscription= null;
  private removeArchivedArticlesListener: Subscription= null;

  constructor(private alertController: AlertController, private articleService: ArticleService) { }

  ngOnInit() {}

  ionViewWillEnter() {
    if (this.getArchivedArticlesListener === null) {
      this.getArchivedArticlesListener= this.articleService.getArchivedArticles().subscribe(res => {
        this.articles= res.articles;
        this.isLoading= false;
      });
    }
  }

  ionViewWillLeave() {
    this.getArchivedArticlesListener && this.getArchivedArticlesListener.unsubscribe();
    this.removeArchivedArticlesListener && this.removeArchivedArticlesListener.unsubscribe();
  }

  pullRefresh(event) {
    this.isLoading= true;

    this.getArchivedArticlesListener= this.articleService.getArchivedArticles().subscribe(res => {
      this.articles= res.articles;
      this.isLoading= false;

      event && event.target.complete();
    });
  }

  async onRemove(article_id: number) {
    const alert= await this.alertController.create({
      message: 'Apakah anda yakin ingin menghapus artikel ini?',
      buttons: [
        {
          text: 'Tetap simpan',
          role: 'cancel'
        },
        {
          text: 'Hapus',
          handler: () => {
            this.removeArchivedArticlesListener= this.articleService.removeArchivedArticles([article_id]).subscribe(res => {
              this.articles= this.articles.filter(object => object.Id !== article_id);
            });
          }
        }
      ]
    });
    
    alert.present();
  }
}
