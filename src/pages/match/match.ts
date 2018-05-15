import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

// Connect Page with Firebase
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

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
let tomorrow = moment().add(1, 'day').format('YYYY-MM-DD').toString();
let yesterday = moment().subtract(1, 'day').format('YYYY-MM-DD').toString();
@Component({
  selector: 'page-match',
  templateUrl: 'match.html'
})
export class MatchPage {
  matchOf = 'today';

  match: any = {
    'today': [
      {
        hide: false,
        col: 'matchitemsToday'
      }
    ],
    'yesterday': [
      {
        hide: false,
        col: 'matchitemsYesterday'
      }
    ],
    'tommorow': [
      {
        hide: false,
        col: 'matchitemsTomorrow'
      }
    ],
    'calendar': [
      {
        hide: false,
        col: 'matchitemsAll'
      }
    ]
  };


  matchesColToday: AngularFirestoreCollection<Matinf>;
  matchesColYesterday: AngularFirestoreCollection<Matinf>;
  matchesColTomorrow: AngularFirestoreCollection<Matinf>;
  matchesColAll: AngularFirestoreCollection<Matinf>;

  matchitemsToday: Observable<Matinf[]>;
  matchitemsYesterday: Observable<Matinf[]>;
  matchitemsTomorrow: Observable<Matinf[]>;
  matchitemsAll: Observable<Matinf[]>;


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


  constructor(public navCtrl: NavController,
    public navParams: NavParams, public afs: AngularFirestore, 
    public statBar: StatusBar, public platform: Platform) { 
      this.platform= platform;
      this.platform.ready().then( () => {
        this.statBar.overlaysWebView(true);
        this.statBar.backgroundColorByHexString('#d1d1d1');
      });
    }

  getItems(type: any) {
    return this.match[type];
  }

  ngOnInit() {
    this.matchesColToday = this.afs.collection('matches', ref => {
      return ref.where('day', '==', now)
    });
      this.matchitemsToday = this.matchesColToday.valueChanges();

    this.matchesColYesterday = this.afs.collection('matches', ref => {
      return ref.where('day', '==', yesterday)
    });
      this.matchitemsYesterday = this.matchesColYesterday.valueChanges();

      
    this.matchesColTomorrow = this.afs.collection('matches', ref => {
      return ref.where('day', '==', tomorrow)
    });
      this.matchitemsTomorrow = this.matchesColTomorrow.valueChanges();
    
    this.matchesColAll = this.afs.collection('matches', ref => {
      return ref.orderBy('day').orderBy('time');
    });
      this.matchitemsAll = this.matchesColAll.valueChanges();
  }
}
