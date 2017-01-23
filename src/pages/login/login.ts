import {NavController, LoadingController, AlertController, Events, ToastController} from 'ionic-angular';
import { Component} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {TabsPage} from '../tabs/tabs';
import {Http} from "@angular/http";
import {SignupPage} from "../signup/signup";
import {ResetPasswordPage} from "../reset-password/reset-password";
import {AuthDjango} from "../../providers/auth-django";

import {AuthProviders, AuthMethods} from 'angularfire2';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
    username:string;
    password:string;
    loading:any;

    logoState:any;
  constructor(public nav: NavController, public formBuilder: FormBuilder,
              public alertCtrl: AlertController, public loadingCtrl: LoadingController,
              public http:Http,public auth:AuthDjango, public events: Events,
              private toastCtrl: ToastController) {

  }


    login(){
        this.showLoader();
        let credentials = {
            username: this.username,
            password: this.password
        };
        this.auth.loginDjango(credentials).then((result) => {
            this.loading.dismiss();
            console.log(result);
            this.events.publish('userAction', {state: true});
            this.nav.setRoot(TabsPage);
        }, (err) => {
            this.loading.dismiss();
            this.presentToast();
            console.log(err);
        });

    }

    presentToast() {
        let toast = this.toastCtrl.create({
            message: 'Unable to login with provided credentials.',
            duration: 3000,
            position: 'bottom'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }

    showLoader(){

        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });

        this.loading.present();

    }


    createNew(){
        this.nav.push(SignupPage);
    }
    reset(){
        this.nav.push(ResetPasswordPage);
    }

}
