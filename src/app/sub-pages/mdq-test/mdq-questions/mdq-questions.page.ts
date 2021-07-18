import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { AlertController, AnimationController, Animation } from '@ionic/angular';

export interface MDQTest {
  question: string,
  answer?: string,
  choices?: { question: string, answer: string }[]
}

@Component({
  selector: 'app-mdq-questions',
  templateUrl: './mdq-questions.page.html',
  styleUrls: ['./mdq-questions.page.scss'],
})
export class MDQQuestionsPage implements OnInit {
  @ViewChild('questionsContainer', { static: true }) questionsContainer: ElementRef;
  @ViewChild('nextButton', { static: true }) nextButton: ElementRef;

  public testQuestions: MDQTest[]= [
    {
      question: 'Pernakah ada periode waktu tertentu ketika anda merasa seperti bukan diri anda yang biasanya dan...',
      choices: [
        { 
          question: 'Anda merasa sangat baik atau hiper sehingga orang lain mengira anda bukan diri anda yang normal atau anda sangat hiper sehingga anda mendapat masalah?', 
          answer: '' 
        },
        { 
          question: 'Anda sangat marah sehingga anda berteriak pada orang atau memulai perkelahian atau pertengkaran?',
          answer: '' 
        },
        { 
          question: 'Anda merasa jauh lebih percaya diri dari biasanya?', 
          answer: '' 
        },
        { 
          question: 'Anda kurang tidur dari biasanya dan ternyata Anda tidak benar-benar melewatkannya?', 
          answer: '' 
        },
        { 
          question: 'Anda lebih banyak bicara atau berbicara lebih cepat dari biasanya?', 
          answer: '' 
        },
        { 
          question: 'Pikiran berpacu di kepala Anda atau Anda tidak bisa memperlambat pikiran Anda?', 
          answer: '' 
        },
        { 
          question: 'Anda begitu mudah terganggu oleh hal-hal di sekitar anda sehingga Anda kesulitan berkonsentrasi atau tetap di jalur?', 
          answer: '' 
        },
        { 
          question: 'Anda memiliki lebih banyak energi dari biasanya?', 
          answer: '' 
        },
        { 
          question: 'Anda jauh lebih aktif atau melakukan lebih banyak hal dari biasanya?', 
          answer: '' 
        },
        { 
          question: 'Anda jauh lebih sosial atau keluar dari biasanya, misalnya, anda menelepon teman di tengah malam?', 
          answer: '' 
        },
        { 
          question: 'Anda jauh lebih tertarik pada seks daripada biasanya?', 
          answer: '' 
        },
        { 
          question: 'Anda melakukan hal-hal yang tidak biasa bagi Anda atau yang mungkin dianggap orang lain berlebihan, bodoh, atau berisiko?', 
          answer: '' 
        },
        { 
          question: 'Menghabiskan uang membuat anda atau keluarga anda dalam masalah?', 
          answer: '' 
        }
      ]
    },
    {
      question: 'Jika anda mencentang "Ya" untuk lebih dari 1 pada Bagian I, apakah beberapa diantaranya pernah terjadi selama periode waktu yang sama?',
      answer: ''
    },
    {
      question: 'Seberapa besar tingkat masalah yang menyebabkan anda seperti tidak dapat bekerja, tidak dapat membangun keluarga, masalah uang atau hukum dan terlibat dalam pertengkaran?',
      answer: ''
    }
  ];
  public currentPage: number= 0;
  public buttonText: string= 'Selanjutnya';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute, 
    private alertController: AlertController, 
    private animationController: AnimationController
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.currentPage= parseInt(params['page']);
    });
  }

  fadeOutInAnimation(name: string, element: ElementRef): Animation {
    return this.animationController
      .create(name)
      .addElement(element.nativeElement)
      .fromTo('opacity', 1, 0)
      .fromTo('opacity', 0, 1)
      .easing('ease-out')
      .duration(1500);
  } 

  onSelectAnswer(answer: string, questionIndex, choiceIndex?: number) {
    if (this.currentPage === 1) {
      this.testQuestions[questionIndex].choices[choiceIndex].answer= answer;
    } else if (this.currentPage === 2) {
      this.testQuestions[questionIndex].answer= answer;
    }
  }

  validationAnswer(): boolean {
    if (this.currentPage === 1) {
      return this.testQuestions[0].choices.every(object => object.answer !== '');
    } else if (this.currentPage === 2) {
      return this.testQuestions[1].answer !== '' && this.testQuestions[2].answer !== '';
    }

    return false;
  }

  onPrev() {
    if (this.currentPage-1 > 0) {
      this.fadeOutInAnimation('mdq-questions-container', this.questionsContainer).play();
      this.fadeOutInAnimation('mdq-next-button', this.nextButton).play();
      this.router.navigate(['/mdq-test/questions'], { queryParams: { page: this.currentPage-= 1 } });
    } else {
      this.router.navigate(['/mdq-test']);
    }
  }

  async onNext() {
    if (this.currentPage+1 < 3) {
      if (!this.validationAnswer()) {
        const alert= await this.alertController.create({
          message: 'Jawaban belum ada yang terisi!',
          buttons: ['OK']
        });
        alert.present();
      } else {
        this.fadeOutInAnimation('mdq-questions-container', this.questionsContainer).play();
        this.fadeOutInAnimation('mdq-next-button', this.nextButton).play();

        if (this.currentPage === 2) {
          this.buttonText= 'Lihat Hasil';
        }

        this.router.navigate(['/mdq-test/questions'], { queryParams: { page: this.currentPage+= 1 } });
      }
    } else {
      const extrasData: NavigationExtras= {
        state: {
          testQuestions: this.testQuestions
        }
      };

      this.buttonText= 'Lihat Hasil';
      this.router.navigate(['/mdq-test/result'], extrasData);
    }
  }
}
