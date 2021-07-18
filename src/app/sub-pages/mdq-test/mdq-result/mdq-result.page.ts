import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MDQTest } from '../mdq-questions/mdq-questions.page';

@Component({
  selector: 'app-mdq-result',
  templateUrl: './mdq-result.page.html',
  styleUrls: ['./mdq-result.page.scss'],
})
export class MDQResultPage implements OnInit {
  public testQuestions: MDQTest[]= [];
  public isPositive: boolean= false;
  public description;

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.testQuestions= this.router.getCurrentNavigation().extras.state.testQuestions;
      this.description= {
        firstQuestion: this.testQuestions[0].choices.filter(object => object.answer === 'Y').length,
        secondQuestion: this.testQuestions[1].answer,
        thirdQuestion: this.extractThirdQuestionAnswer()
      };
      this.calculateScore();
    }
  }

  extractThirdQuestionAnswer(): string {
    if (this.testQuestions[2].answer === 'TM') {
      return 'Tidak Ada Permasalahan';
    } else if (this.testQuestions[2].answer === 'PK') {
      return 'Permasalahan Kecil';
    } else if (this.testQuestions[2].answer === 'PS') {
      return 'Permasalahan Sedang';
    }

    return 'Permasalahan Besar atau Serius';
  }

  calculateScore() {
    const firstQuestion: boolean= this.testQuestions[0].choices.filter(object => object.answer === 'Y').length >= 7;
    const secondQuestion: boolean= this.testQuestions[1].answer === 'Y';
    const thirdQuestion: boolean= this.testQuestions[2].answer === 'PS' || this.testQuestions[2].answer === 'PB';

    if (firstQuestion && secondQuestion && thirdQuestion) {
      this.isPositive= true;
    }
  }
}
