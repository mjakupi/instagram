import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import {TabsPage} from "../tabs/tabs";
import {Headers, Http} from "@angular/http";
import {LoginPage} from "../login/login";
import {AuthDjango} from "../../providers/auth-django";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  loading: any;

    username:string;
    password:string;

  constructor(public nav: NavController,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public http:Http,
              public auth:AuthDjango
  ) {}


  register(){

    this.showLoader();

    let details = {
      username: this.username,
      password: this.password,

    };

    this.auth.createAccount(details).then((result) => {
      this.loading.dismiss();
      console.log(result);
      this.nav.setRoot(TabsPage);
    }, (err) => {
      this.loading.dismiss();
    });

  }

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }
}

