import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {OptionsPage} from "../options/options";

/*
  Generated class for the Editprofile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html'
})
export class EditprofilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public viewCtrl:ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
  }

  close() {
    this.viewCtrl.dismiss(); // This works fine
  }
}
