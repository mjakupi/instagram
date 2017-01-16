import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {AuthData} from "../../providers/auth";
import {Django} from "../../providers/django";

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
  public people:any;
  rows:any;
  imageID: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public AuthData: AuthData,
              public peopleService:Django,
              public viewCtrl:ViewController,
            ) {
    this.imageID = this.navParams.get('id');
  }

  ionViewDidLoad() {
    this.peopleService.loadPeople().subscribe(data => {
      this.people = data;
      this.rows = Array.from(Array(Math.ceil(data.length / 3)).keys());
    });
    console.log('ionViewDidLoad ImageModalPage');
  }
  close() {
    this.viewCtrl.dismiss(); // This works fine
  }
}
