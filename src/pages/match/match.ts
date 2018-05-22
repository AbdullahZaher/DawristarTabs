import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Connect Page with Firebase
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

import { ViewmatchPage } from '../viewmatch/viewmatch';

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
  nomatch = true;

  match: any = {
    'today': [
      {
        hide: false,
        col: 'matchToday'
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
    public navParams: NavParams, public afs: AngularFirestore) { 

      this.matchesColToday = this.afs.collection('matches', ref => {
        return ref.where('day', '==', now).orderBy('time');
      });
        this.matchitemsToday = this.matchesColToday.valueChanges();

      this.matchesColYesterday = this.afs.collection('matches', ref => {
        return ref.where('day', '==', yesterday).orderBy('time');
      });
        this.matchitemsYesterday = this.matchesColYesterday.valueChanges();
  
      this.matchesColTomorrow = this.afs.collection('matches', ref => {
        return ref.where('day', '==', tomorrow).orderBy('time');
      });
        this.matchitemsTomorrow = this.matchesColTomorrow.valueChanges();
      
      this.matchesColAll = this.afs.collection('matches', ref => {
        return ref.orderBy('day').orderBy('time');
      });
        this.matchitemsAll = this.matchesColAll.valueChanges();
    }
  
    showMatchInfo(matchitem) {
      this.navCtrl.push(ViewmatchPage, matchitem);
  }

  getItems(type: any) {
    return this.match[type];
  }

    
}
