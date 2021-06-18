import { Component, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core';

import { Article } from 'src/app/models/article.model';

@Component({
  selector: 'article-featured-item',
  templateUrl: './article-featured-item.component.html',
  styleUrls: ['./article-featured-item.component.scss'],
})
export class ArticleFeaturedItemComponent implements OnInit {
  @Input() article: Article;
  @ViewChild('articleFeaturedTemplate', { static: true }) template;
  
  constructor(private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.viewContainerRef.createEmbeddedView(this.template);
  }
}
