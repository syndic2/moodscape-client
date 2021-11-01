import { Component, OnInit, OnChanges, Input } from '@angular/core';

import { MOOD_EMOTICON_COLORS, MOOD_ICON_PATHS } from 'src/app/models/mood.model';

@Component({
  selector: 'moods-count',
  templateUrl: './moods-count.component.html',
  styleUrls: ['./moods-count.component.scss'],
})
export class MoodsCountComponent implements OnInit, OnChanges {
  @Input() moodsCount: any;
  @Input() emoticonSize: string= 'text-2xl';

  public moods: any[]= [
    { count: 0, iconPath: MOOD_ICON_PATHS.GEMBIRA, emoticonColor: MOOD_EMOTICON_COLORS.GEMBIRA },
    { count: 0, iconPath: MOOD_ICON_PATHS.SENANG, emoticonColor: MOOD_EMOTICON_COLORS.SENANG },
    { count: 0, iconPath: MOOD_ICON_PATHS.NETRAL, emoticonColor: MOOD_EMOTICON_COLORS.NETRAL },
    { count: 0, iconPath: MOOD_ICON_PATHS.SEDIH, emoticonColor: MOOD_EMOTICON_COLORS.SEDIH },
    { count: 0, iconPath: MOOD_ICON_PATHS.BURUK, emoticonColor: MOOD_EMOTICON_COLORS.BURUK }
  ];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    Object.entries(this.moodsCount).forEach(([key, value], index) => {
      this.moods[index].count= value;
    });
  }
}
