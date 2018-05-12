import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { MatchPage } from '../match/match';
import { NewsPage } from '../news/news';
import { HashtagPage } from '../hashtag/hashtag';
import { MediaPage } from '../media/media';

@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = MatchPage;
  tab3Root: any = NewsPage;
  tab4Root: any = HashtagPage;
  tab5Root: any = MediaPage;

  constructor(public navCtrl: NavController) {
  }
  goToHome(params){
    if (!params) params = {};
    this.navCtrl.push(HomePage);
  }goToMatch(params){
    if (!params) params = {};
    this.navCtrl.push(MatchPage);
  }goToNews(params){
    if (!params) params = {};
    this.navCtrl.push(NewsPage);
  }goToHashtag(params){
    if (!params) params = {};
    this.navCtrl.push(HashtagPage);
  }goToMedia(params){
    if (!params) params = {};
    this.navCtrl.push(MediaPage);
  }
}
