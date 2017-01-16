import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { LikesPage } from '../likes/likes';
import { ProfilePage } from '../profile/profile';
import {TakePhotoPage} from "../take-photo/take-photo";
import {SearchPage} from "../search/search";
import {Events, Nav} from "ionic-angular/index";
import {WelcomePage} from "../welcome/welcome";


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = SearchPage;
  tab3Root: any = LikesPage;
  profile: any = ProfilePage;
  takePhoto: any = TakePhotoPage;

  userLoggedIn: boolean = true;

  constructor(public events: Events, public nav: Nav) {

    this.events.subscribe('userAction', (value) => {

      this.userLoggedIn = value.state;

      if(value.state == false){
        this.nav.setRoot(WelcomePage);
      }

    })


  }
}
