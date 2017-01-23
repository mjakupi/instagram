import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {FirebaseService} from "../../providers/firebase-service";

/*
  Generated class for the TakePhoto page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-take-photo',
  templateUrl: 'take-photo.html'
})
export class TakePhotoPage {
  photos: FirebaseListObservable<any>;
    constructor(public navCtrl: NavController,public firebase:FirebaseService,private af: AngularFire) {

  }


  ionViewDidEnter() {
        this.firebase.takePicture();
      }




}



