import {NavController, LoadingController, AlertController, ToastController} from 'ionic-angular';
import { Component } from '@angular/core';
import {TabsPage} from "../tabs/tabs";
import {Http} from "@angular/http";
import {AuthDjango} from "../../providers/auth-django";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  loading: any;

    username:string;
    password:string;
    private email;

  constructor(public nav: NavController,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public http:Http,
              public auth:AuthDjango,
              private toastCtrl: ToastController
  ) {}


  register(){

    let details = {
        email : this.email,
        username: this.username,
        password: this.password,

    };

    this.auth.createAccount(details).then((result) => {
        this.presentToast();
        console.log(result);
      this.nav.setRoot(TabsPage);
    }, (err) => {
        this.errorMsg();
    });

  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'User successfully registered',
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {

      console.log('Dismissed toast');
    });

    toast.present();
  }

    errorMsg() {
        let toast = this.toastCtrl.create({
            message: 'Username:This field is required,' +
            'Password:This field is required',
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
}

