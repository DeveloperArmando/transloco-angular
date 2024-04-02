import { Component, OnInit } from '@angular/core';
import {
  LangDefinition,
  TranslocoService,
  translate,
  getBrowserCultureLang,
} from '@jsverse/transloco';
import { Subscription, filter, take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'translation-transloco';
  availableLangs =
    this.translocoService.getAvailableLangs() as LangDefinition[];
  private subscription?: Subscription | null;

  constructor(private translocoService: TranslocoService) {
    const langBrowser = getBrowserCultureLang();
    console.log('langBrowser', langBrowser);
    this.changeLang(langBrowser);
  }

  ngOnInit() {
    // Esas a mi no me jalaron
    // const translation = translate('hello', {}, 'es-PE');
    // console.log(translation);
    // const translation2 = this.translocoService.translate('hello', {}, 'es-PE');
    // console.log(translation2);
    // this.translocoService
    //   .selectTranslate('greetings')
    //   .subscribe((translation) => {
    //     console.log(translation);
    //   });
    // this.translocoService.load('es-MX').subscribe();
    // this.translocoService.events$
    //   .pipe(filter((event) => event.type === 'translationLoadSuccess'))
    //   .subscribe(() => {
    //     console.log('translation loaded');
    //     const translation = this.translocoService.translate('greetings');
    //     console.log(translation);
    //   });
  }

  get activeLang() {
    return this.translocoService.getActiveLang();
  }

  changeLang(lang: string) {
    this.subscription?.unsubscribe();
    this.subscription = this.translocoService
      .load(lang)
      .pipe(take(1))
      .subscribe(() => {
        this.translocoService.setActiveLang(lang);
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscription = null;
  }
}
