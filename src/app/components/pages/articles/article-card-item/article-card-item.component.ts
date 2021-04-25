import { Component, OnInit, Input } from '@angular/core';

import { Article } from 'src/app/models/article';

@Component({
  selector: 'article-card-item',
  templateUrl: './article-card-item.component.html',
  styleUrls: ['./article-card-item.component.scss'],
})
export class ArticleCardItemComponent implements OnInit {
  @Input() article: Article;

  constructor() { }

  ngOnInit() {}
}
