import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, ModalController, ViewController, Nav, Events} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {EditprofilePage} from "../editprofile/editprofile";
import {Http, RequestOptions, Headers} from "@angular/http";
import { Storage } from '@ionic/storage';
import {AuthDjango} from "../../providers/auth-django";
import {IntroPage} from "../intro/intro";
import {WelcomePage} from "../welcome/welcome";

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
              public events: Events
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
    this.events.publish('userAction', {state: false});

  //   this.auth.logoutDjango().then(() => {
  //
  //
  // });
}
}