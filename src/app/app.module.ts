import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ActivatedRoute, RouterModule} from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutUsPageComponent } from './pages/about-us-page/about-us-page.component';
import { ContactsComponent } from './pages/contacts/contacts.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AboutUsPageComponent,
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        component: HomePageComponent
      },
      {
        path: 'about-us',
        component: AboutUsPageComponent
      },
      {
        path: 'contacts',
        component: ContactsComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(translate: TranslateService, activatedRoute: ActivatedRoute) {
    translate.setDefaultLang('en');
    translate.use(localStorage.getItem('lang') || 'en');
    activatedRoute.queryParams.subscribe(queryParams => {
      console.log(queryParams.lang);
      if (['ru', 'en'].includes(queryParams.lang)) {
        localStorage.setItem('lang', queryParams.lang);
        translate.use(queryParams.lang);
      }
    });
  }
}
