import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import { MyApp } from './app.component';
import {Storage} from "@ionic/storage";
import { LikesPage } from '../pages/likes/likes';
import {SignupPage} from '../pages/signup/signup';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {ProfilePage} from "../pages/profile/profile";
import {TakePhotoPage} from "../pages/take-photo/take-photo";
import {LoginPage} from "../pages/login/login";
import {AuthData} from "../providers/auth";
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
  FollowingComponent,
  YouComponent
];

export function declarations() {
  return pages;
}
export function entryComponents() {
  return pages;
}

@NgModule({
  declarations: declarations(),
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: entryComponents(),
  providers: [
    AuthData,
    AuthDjango,
    Storage,
    Django,
      TokenProvider,
    {  provide: ErrorHandler, useClass: IonicErrorHandler },


  ]
})
export class AppModule {}

