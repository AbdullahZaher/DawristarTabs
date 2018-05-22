import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { environment } from '../environments/environment';

import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { HomePage } from '../pages/home/home';
import { MatchPage } from '../pages/match/match';
import { NewsPage } from '../pages/news/news';
import { HashtagPage } from '../pages/hashtag/hashtag';
import { MediaPage } from '../pages/media/media';
import { ViewmatchPage } from '../pages/viewmatch/viewmatch';
import { ViewnewsPage } from '../pages/viewnews/viewnews';
import { ViewtopicPage } from '../pages/viewtopic/viewtopic';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Connect app with Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';

// Moment
import { MomentModule } from 'ngx-moment';
// Autohide icon
import { AutohideDirective } from '../directives/autohide/autohide';

import { IonicImageViewerModule } from 'ionic-img-viewer';


@NgModule({
  declarations: [
    MyApp,
    TabsControllerPage,
    HomePage,
    MatchPage,
    NewsPage,
    HashtagPage,
    MediaPage,
    ViewmatchPage,
    ViewnewsPage,
    ViewtopicPage,
    AutohideDirective
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebaseconfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    MomentModule,
    IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsControllerPage,
    HomePage,
    MatchPage,
    NewsPage,
    HashtagPage,
    MediaPage,
    ViewmatchPage,
    ViewnewsPage,
    ViewtopicPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}