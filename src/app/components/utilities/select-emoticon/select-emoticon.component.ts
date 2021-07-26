import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { EMOTICON_COLORS, MoodEmoticon } from 'src/app/models/mood.model';

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
      icon: 'icons/svg/emoticons/happy.svg',
      color: EMOTICON_COLORS.GEMBIRA
    },
    {
      name: 'senang',
      value: 4,
      icon: 'icons/svg/emoticons/smile.svg',
      color: EMOTICON_COLORS.SENANG
    },
    {
      name: 'netral',
      value: 3,
      icon: 'icons/svg/emoticons/neutral.svg',
      color: EMOTICON_COLORS.NETRAL
    },
    {
      name: 'sedih',
      value: 2,
      icon: 'icons/svg/emoticons/sad.svg',
      color: EMOTICON_COLORS.SEDIH
    },
    {
      name: 'buruk',
      value: 1,
      icon: 'icons/svg/emoticons/awful.svg',
      color: EMOTICON_COLORS.BURUK
    },
  ];

  constructor() { }

  ngOnInit() {}

  onSelectEmoticon(emoticon: MoodEmoticon) {
    this.selectEmoticonEvent.emit(emoticon);
  }
}
