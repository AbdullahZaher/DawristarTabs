import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

// Connect Page with Firebase
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface mediaInterface {
  title: string;
  comment: string;
  file: string;
  link: string;
}
@Component({
  selector: 'page-media',
  templateUrl: 'media.html'
})
export class MediaPage {
  mediaCol: AngularFirestoreCollection<mediaInterface>;
  mediaItems: Observable<mediaInterface[]>;
  title: string;
  comment: string;
  file: string;
  link: string;

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
      this.mediaCol = this.afs.collection('media');
      this.mediaItems = this.mediaCol.valueChanges();
    }
}
