import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, ModalController, ViewController, Nav, Events} from 'ionic-angular';
import {EditprofilePage} from "../editprofile/editprofile";
import {Http} from "@angular/http";
import { Storage } from '@ionic/storage';
import {AuthDjango} from "../../providers/auth-django";
import {TokenProvider} from "../../providers/token-provider";

/*
  Generated class for the Options page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-options',
  templateUrl: 'options.html'
})
export class OptionsPage {
  @ViewChild(Nav) nav: Nav;

  url:string = 'http://127.0.0.1:8000/auth/logout/';
  url1:string = 'http://ec2-35-156-212-193.eu-central-1.compute.amazonaws.com:8080/auth/logout/';

  auth_token:string;
  public username:string;
  public password:any;

  constructor(public navCtrl:NavController,
              public navParams:NavParams,
              public modalCtrl:ModalController,
              public viewCtrl:ViewController,
              public http:Http,
              public auth:AuthDjango,
              public storage:Storage,
              public events: Events,
              public tokenProvider:TokenProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OptionsPage');
  }

  presentProfileModal() {
    let profileModal = this.modalCtrl.create(EditprofilePage);
    profileModal.present();
  }

  logout(){

    // set global variable that the user is logged off
    window.localStorage.setItem('userLoggedIn','0');

    this.events.publish('userAction', {state: false});
    window.localStorage.removeItem('email'); // remove email dari localStorage
    window.localStorage.removeItem('uid'); // remove uid dari localStorage
    window.localStorage.removeItem('displayName'); // remove displayName dari localStorage

  //   this.auth.logoutDjango().then(() => {
  //
  //
  // });
}
}