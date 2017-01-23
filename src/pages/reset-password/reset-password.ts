import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AuthDjango} from "../../providers/auth-django";
import {Http} from "@angular/http";
import {Sharedvars} from "../../providers/sharedvars";

/*
  Generated class for the ResetPassword page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html'
})
export class ResetPasswordPage {
  public email:any;

  constructor(public navCtrl:NavController, public http:Http, public sharedVars:Sharedvars, public authDjango:AuthDjango) {
  }

  ionViewDidLoad() {
    console.log('Hello ResetPasswordPage');
  }

  submit(){
    let credentials = {
      email: this.email,
    };
    this.authDjango.resetPassword(credentials).then((result =>{
      console.log(result);
    }));
  }
}