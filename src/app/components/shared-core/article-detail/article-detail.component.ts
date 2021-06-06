import { Component, OnInit, Input } from '@angular/core';

import { Article } from 'src/app/models/article.model';

@Component({
  selector: 'article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {
  @Input() article: Article;

  constructor() { }

  ngOnInit() { }
}
