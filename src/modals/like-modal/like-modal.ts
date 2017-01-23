import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

/*
  Generated class for the LikeModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-like-modal',
  templateUrl: 'like-modal.html'
})
export class LikeModalPage {

  constructor(public navCtrl: NavController,public viewCtrl:ViewController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LikeModalPage');
  }
  close() {
    this.viewCtrl.dismiss(); // This works fine
  }
}
