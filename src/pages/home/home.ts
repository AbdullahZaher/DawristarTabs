import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

// Connect Page with Firebase
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ViewnewsPage } from '../viewnews/viewnews';
import { ViewmatchPage } from '../viewmatch/viewmatch';

import * as moment from 'moment';

// News interface
interface Newsinf {
  title: string;
  img: string;
  slideImg: string;
  keywords: string;
  desc: string;
  newsAuthor: string;
  newsDate: string;
  text: string;
  isShown: boolean;
  isSlide: boolean;
  newsViews: number;
  newsLikes: number;
  id?: any;
}
// Matches interface
interface Matinf {
  league: string;
  home: string;
  home_bdg: string;
  away: string;
  away_bdg: string;
  day: string;
  time: string;
  field: string;
  ref: string;
  tv: string;
  comm: string;
  tag: string;
}

let now = moment().format('YYYY-MM-DD');

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  @ViewChild(Slides) slides: Slides;

  newsCol: AngularFirestoreCollection<Newsinf>;
  items: Observable<Newsinf[]>;

  newsSlide: AngularFirestoreCollection<Newsinf>;
  slideItems: Observable<Newsinf[]>;
  title: string;
  img: string;
  slideImg: string;
  keywords: string;
  desc: string;
  newsAuthor: string;
  newsDate: string;
  text: string;
  isShown: boolean;
  isSlide: boolean;
  newsViews: number;
  newsLikes: number;

  matchesCol: AngularFirestoreCollection<Matinf>;
  matchitems: Observable<Matinf[]>;
  league: string;
  home: string;
  home_bdg: string;
  away: string;
  away_bdg: string;
  day: string;
  time: string;
  field: string;
  ref: string;
  tv: string;
  comm: string;
  tag: string;
  limit = 20;
  constructor(public navCtrl: NavController,
    public navParams: NavParams, public afs: AngularFirestore,
    private statusBar: StatusBar, private admob: AdMobFree,
    private platform: Platform) {
      this.statusBar.hide();
      this.statusBar.overlaysWebView(true);
    }

    ionViewDidLoad(){
      if(this.platform.is('android')){
      const bannerConfig: AdMobFreeBannerConfig = {
        id: 'ca-app-pub-1941434641274424/6258307936',
        isTesting: false,
        autoShow: true
       };
       this.admob.banner.config(bannerConfig);
       
       this.admob.banner.prepare()
         .then(() => {
        
         })
         .catch(e => console.log(e));
        }

        if (this.platform.is('ios')) {
          const bannerConfig: AdMobFreeBannerConfig = {
            id: 'ca-app-pub-1941434641274424/5453590202',
            isTesting: false,
            autoShow: true
           };
           this.admob.banner.config(bannerConfig);
           
           this.admob.banner.prepare()
             .then(() => {
            
             })
             .catch(e => console.log(e));
            }
        }

    

  ngOnInit() {
    this.newsSlide = this.afs.collection('news', ref => {
      return ref.orderBy('newsDate', 'desc').where('isSlide', '==', true).limit(this.limit)
    });
    this.slideItems = this.newsSlide.valueChanges();

    this.newsCol = this.afs.collection('news', ref => {
      return ref.orderBy('newsDate', 'desc').limit(this.limit)
    });
    this.items = this.newsCol.valueChanges();

    this.matchesCol = this.afs.collection('matches', ref => {
      return ref.where('day', '==', now).orderBy('time');
    });
    this.matchitems = this.matchesCol.valueChanges();

  }
  

  showNewsInfo(item) {
    this.navCtrl.push(ViewnewsPage, item);
  }
  showMatchInfo(matchitem) {
    this.navCtrl.push(ViewmatchPage, matchitem);
  }

}