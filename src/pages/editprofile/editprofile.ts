import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {AuthDjango} from "../../providers/auth-django";

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
    username:string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl:ViewController,
              public authDjango:AuthDjango) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
      this.username = '';
  }

  close() {
    this.viewCtrl.dismiss(); // This works fine
  }

    updateName(){
        this.setUsername();
    }

    setUsername(){
        this.username='Metin';
    }

    getUsername(){
        return this.username;
    }
}
