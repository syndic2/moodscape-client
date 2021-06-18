import { Component, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core';

import { Article } from 'src/app/models/article.model';

@Component({
  selector: 'article-card-item',
  templateUrl: './article-card-item.component.html',
  styleUrls: ['./article-card-item.component.scss'],
})
export class ArticleCardItemComponent implements OnInit {
  @Input() article: Article;
  @ViewChild('articleCard', { static: true }) template;

  constructor(private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.viewContainerRef.createEmbeddedView(this.template);
  }
}
