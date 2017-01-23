import { Component,ViewChild } from '@angular/core';
import {NavController, NavParams, ViewController, Slides} from 'ionic-angular';
import {Django} from "../../providers/django";
import firebase from 'firebase';
/*
  Generated class for the ImageModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-image-modal',
  templateUrl: 'image-modal.html'
})
export class ImageModalPage {
    @ViewChild(Slides) slides: Slides;
    public people:any;
    rows:any;
    assetCollection: any;
    constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public peopleService:Django,
              public viewCtrl:ViewController,
            ) {

  }
    goToSlide() {
        this.slides.slideTo(2, 500);
    }
    slideChanged() {
        let currentIndex = this.slides.getActiveIndex();
        console.log("Current index is", currentIndex);
    }
  ionViewDidEnter() {
      firebase.database().ref('assets').on('value', (_snapshot:any) => {
          var result = [];

          _snapshot.forEach((_childSnapshot) => {
              // get the key/id and the data for display
              var element = _childSnapshot.val();
              element.id = _childSnapshot.key;
              result.push(element);
              //this.firebaseImages.push(element);
              console.log(result);
          });

          // set the component property
          this.assetCollection = result
  });
  }


  close() {
    this.viewCtrl.dismiss(); // This works fine
  }
}
