import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Article } from 'src/app/models/article';

import { ArticleService } from 'src/app/services/article/article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.page.html',
  styleUrls: ['./article-detail.page.scss'],
})
export class ArticleDetailPage implements OnInit {
  public article: Article;

  constructor(private activatedRoute: ActivatedRoute, private articleService: ArticleService) { }

  ngOnInit() { }

  ionViewWillEnter() {
    const urlName= this.activatedRoute.snapshot.paramMap.get('urlName');

    this.articleService.getOneByUrlName(urlName).subscribe((res: Article) => this.article= res);
  }
}
