import {Component, ViewChild} from '@angular/core';
import {Nav,Platform} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import {IntroPage} from "../pages/intro/intro";
import {WelcomePage} from "../pages/welcome/welcome";
import {TokenProvider} from "../providers/token-provider";

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = TabsPage;

  constructor(platform: Platform,
              public tokenProvider:TokenProvider
  ) {
      //noinspection TypeScriptUnresolvedFunction

      var isLoggedIn = window.localStorage.getItem('Auth-Token');

      if(isLoggedIn == '1'){
          this.rootPage = TabsPage;
      }else{
          this.rootPage = WelcomePage;
      }

          //noinspection TypeScriptUnresolvedFunction
          platform.ready().then(() => {

              Splashscreen.hide();
              StatusBar.styleDefault();
  });
}
}

//FIREBASE

//noinspection TypeScriptUnresolvedFunction
/*
 firebase.initializeApp({
 apiKey: "AIzaSyCzMTW1-b6hBGHv0KU9byMLkjJbpHhPsvI",
 authDomain: "myapp-5be49.firebaseapp.com",
 databaseURL: "https://myapp-5be49.firebaseio.com",
 storageBucket: "myapp-5be49.appspot.com",
 messagingSenderId: "1013851830521"
 });

 NativeStorage.getItem('user')
 .then( function (data) {
 // user is previously logged and we have his data
 // we will let him access the app
 env.nav.push(TabsPage);
 Splashscreen.hide();
 }, function (error) {
 //we don't have the user data so we will ask him to log in
 env.nav.push(WelcomePage);

 });

 firebase.auth().onAuthStateChanged((user) => {
 if (!user) {
 this.nav.setRoot(WelcomePage);

 }
 */