import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// Connect Page with Firebase
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ViewnewsPage } from '../viewnews/viewnews';
import { ViewtopicPage } from '../viewtopic/viewtopic';

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

// Article interface
interface Artinf {
  title: string;
  img: string;
  author: string;
  keywords: string;
  essay: string;
  date: string;
  id?: any;
}
@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsPage {
  selectThe = 'news';

  select: any = {
    'news': [
      {
        hide: false,
        col: 'newsitems'
      }
    ],
    'article': [
      {
        hide: false,
        col: 'artitems'
      }
    ]
  };

  newsCol: AngularFirestoreCollection<Newsinf>;
  newsitems: Observable<Newsinf[]>;

  artCol: AngularFirestoreCollection<Artinf>;
  artitems: Observable<Artinf[]>;

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


  essay: string;
  date: string;
  id?: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
     public afs: AngularFirestore) {}

  getItems(type: any) {
    return this.select[type];
  }

  ngOnInit() {
    this.newsCol = this.afs.collection('news', ref => {
      return ref.orderBy('newsDate', 'desc')
    });
    this.newsitems = this.newsCol.valueChanges();

    this.artCol = this.afs.collection('articles', ref => {
      return ref.orderBy('date', 'desc')
    });
    this.artitems = this.artCol.valueChanges();
  }
  
  showNewsInfo(item){
    this.navCtrl.push(ViewnewsPage, item);
  }
  showTopicInfo(item) {
    this.navCtrl.push(ViewtopicPage, item);
  }
}
