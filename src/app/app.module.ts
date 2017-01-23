import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { MyApp } from './app.component';
import {Storage} from "@ionic/storage";
import { LikesPage } from '../pages/likes/likes';
import {SignupPage} from '../pages/signup/signup';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {ProfilePage} from "../pages/profile/profile";
import {TakePhotoPage} from "../pages/take-photo/take-photo";
import {LoginPage} from "../pages/login/login";
import {ResetPasswordPage} from "../pages/reset-password/reset-password";

import {Django} from "../providers/django";
import {SearchPage} from "../pages/search/search";
import {IntroPage} from "../pages/intro/intro";
import {OptionsPage} from "../pages/options/options";
import {EditprofilePage} from "../pages/editprofile/editprofile";
import {FollowingComponent} from "../components/following/following";
import {YouComponent} from "../components/you/you";
import {WelcomePage} from "../pages/welcome/welcome";
import {FacebookPage} from "../pages/facebook/facebook";
import {ImageModalPage} from "../modals/image-modal/image-modal";
import {AuthDjango} from "../providers/auth-django";
import {TokenProvider} from "../providers/token-provider";
import {Sharedvars} from "../providers/sharedvars";
import {Api} from "../providers/api";
import {MapPage} from "../modals/map/map";
import {Locations} from "../providers/locations";
import {GoogleMaps} from "../providers/google-maps";
import {Connectivity} from "../providers/connectivity";
import {ListPage} from "../modals/list/list";
import {FirebaseService} from "../providers/firebase-service";
import {LikeModalPage} from "../modals/like-modal/like-modal";

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
let pages = [
  MyApp,
  SearchPage,
  LikesPage,
  HomePage,
  TabsPage,
  LoginPage,
  ProfilePage,
  TakePhotoPage,
  SignupPage,
  ResetPasswordPage,
  IntroPage,
  OptionsPage,
  EditprofilePage,
  WelcomePage,
  FacebookPage,
  ImageModalPage,
  MapPage,
  ListPage,
  FollowingComponent,
  YouComponent,
  LikeModalPage
];

export function declarations() {
  return pages;
}
export function entryComponents() {
  return pages;
}
var firebaseConfig = {
    apiKey: "AIzaSyBPX0oQYfTYBb2-mLZtWowOyOmsDL7sg84",
    authDomain: "instagram-95307.firebaseapp.com",
    databaseURL: "https://instagram-95307.firebaseio.com",
    storageBucket: "instagram-95307.appspot.com",
    messagingSenderId: "891016089749"
};



@NgModule({
  declarations: declarations(),
  imports: [
    IonicModule.forRoot(MyApp),
      AngularFireModule.initializeApp(firebaseConfig)

  ],
  bootstrap: [IonicApp],
  entryComponents: entryComponents(),
  providers: [
    AuthDjango,
    Storage,
    Django,
    Sharedvars,
    Api,
    TokenProvider,
    Locations,
    FirebaseService,
    GoogleMaps,
    Connectivity,
    {  provide: ErrorHandler, useClass: IonicErrorHandler },


  ]
})
export class AppModule {}

