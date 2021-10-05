import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { MOOD_EMOTICON_COLORS, MoodEmoticon } from 'src/app/models/mood.model';

@Component({
  selector: 'select-emoticon',
  templateUrl: './select-emoticon.component.html',
  styleUrls: ['./select-emoticon.component.scss'],
})
export class SelectEmoticonComponent implements OnInit {
  @Input() selectedEmoticon: MoodEmoticon;
  @Output() selectEmoticonEvent= new EventEmitter<any>();

  public emoticons: MoodEmoticon[]= [
    {
      name: 'gembira',
      value: 5,
      iconPath: 'icons/svg/emoticons/happy.svg',
      color: MOOD_EMOTICON_COLORS.GEMBIRA
    },
    {
      name: 'senang',
      value: 4,
      iconPath: 'icons/svg/emoticons/smile.svg',
      color: MOOD_EMOTICON_COLORS.SENANG
    },
    {
      name: 'netral',
      value: 3,
      iconPath: 'icons/svg/emoticons/neutral.svg',
      color: MOOD_EMOTICON_COLORS.NETRAL
    },
    {
      name: 'sedih',
      value: 2,
      iconPath: 'icons/svg/emoticons/sad.svg',
      color: MOOD_EMOTICON_COLORS.SEDIH
    },
    {
      name: 'buruk',
      value: 1,
      iconPath: 'icons/svg/emoticons/awful.svg',
      color: MOOD_EMOTICON_COLORS.BURUK
    }
  ];

  constructor() { }

  ngOnInit() {}

  onSelectEmoticon(emoticon: MoodEmoticon) {
    this.selectEmoticonEvent.emit(emoticon);
  }
}
