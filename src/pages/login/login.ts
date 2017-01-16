import {NavController, LoadingController, AlertController, Events} from 'ionic-angular';
import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {TabsPage} from '../tabs/tabs';
import {Headers, RequestOptions, Http} from "@angular/http";
import { Storage } from '@ionic/storage';
import {SignupPage} from "../signup/signup";
import {ResetPasswordPage} from "../reset-password/reset-password";
import {AuthDjango} from "../../providers/auth-django";
import {HomePage} from "../home/home";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  animations: [

    //For the logo
    trigger('flyInBottomSlow', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0'}),
        animate('2000ms ease-in-out')
      ])
    ]),

    //For the background detail
    trigger('flyInBottomFast', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0)'}),
        animate('1000ms ease-in-out')
      ])
    ]),

    //For the login form
    trigger('bounceInBottom', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        animate('3000ms 300ms ease-in', keyframes([
          style({transform: 'translate3d(0,2000px,0)', offset: 0}),
          style({transform: 'translate3d(0,-20px,0)', offset: 0.9}),
          style({transform: 'translate3d(0,0,0)', offset: 1})
        ]))
      ])
    ]),
    //For the login form
    trigger('bounceInBottom1', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        animate('3500ms 350ms ease-in', keyframes([
          style({transform: 'translate3d(0,2000px,0)', offset: 0}),
          style({transform: 'translate3d(0,-20px,0)', offset: 0.9}),
          style({transform: 'translate3d(0,0,0)', offset: 1})
        ]))
      ])
    ]),


    //For login button
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({opacity: 0}),
        animate('1000ms 2000ms ease-in')
      ])
    ])
  ]
})

export class LoginPage {
    username:string;
    password:string;
    loading:any;
  constructor(public nav: NavController, public formBuilder: FormBuilder,
              public alertCtrl: AlertController, public loadingCtrl: LoadingController,
              public http:Http,public auth:AuthDjango, public events: Events) {

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
            console.log(err);
        });

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


/*

    djangoLogin(){
        let headers = new Headers ();
        headers.append('Content-Type','application/json');
        headers.append('Authorization',' Bearer ' + this.auth_token);
        headers.append('Accept','application/json');
        let options = new RequestOptions({headers: headers});
        let nav = this.nav;
        return this.http.post('http://127.0.0.1:8000/auth/login/',JSON.stringify(this.loginData),options)
            .map(res => res.json())
            .subscribe(
                data => {
                    localStorage.setItem('auth_token',data.auth_token);
                    //this.storage.set('username',this.loginData.username);
                    //this.storage.set('authtoken',data.auth_token);
                    nav.push(TabsPage);
                    console.log('this is token ->',data.auth_token);
                    //this.storage.get('auth_token');
                    //this.storage.get('username');
                    },
                err => {
                    console.log("ERROR!: ", err);

                }
            );

    }
*/
}
