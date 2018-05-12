import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, public navParams: NavParams, public statBar: StatusBar, public platform: Platform) {
    this.platform= platform;
    this.platform.ready().then( () => {
      this.statBar.overlaysWebView(true);
      this.statBar.backgroundColorByHexString('#D1E390');
    });
  }
  
  ttt = [
    {
      slideimg: 'https://c.top4top.net/p_833ca73o1.jpg',
      title: 'هازارد: نسعى لإمتاع جماهير بلجيكا أمام السعودية',
    },
    {
      slideimg: 'https://f.top4top.net/p_861idh8r1.jpg',
      title: 'عكس التوقعات.. غريزمان لم يوافق',
    },
    {
      slideimg: 'https://f.top4top.net/p_834l05su1.jpg',
      title: 'وداع مؤثر للقحطاني بعد إعلان إعتزاله',
    },
  ];

}
