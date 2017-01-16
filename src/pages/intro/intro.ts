import { Component } from '@angular/core';

import { MenuController, NavController } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {WelcomePage} from "../welcome/welcome";





export interface Slide {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html'
})
export class IntroPage {
  slides: Slide[];
  showSkip = true;

  constructor(public navCtrl: NavController, public menu: MenuController) {

          this.slides = [
            {
              title:"Welcome to the Instagram",
              description :'The <b>Made with Ionic</b> is a fully-featured Ionic starter with many pre-built pages and best practices.',
              image: 'assets/img/ica-slidebox-img-1.png',
            },
            {
              title:"How to use Instagram ",
              description :'The <b>Ionic Instagram </b> is a fully-featured Ionic starter with many pre-built pages and best practices.',
              image: 'assets/img/ica-slidebox-img-2.png',
            },
            {
              title:"Getting Started",
              description :'Need help? Check out the Instagram README for a full tutorial.',
              image: 'assets/img/ica-slidebox-img-3.png',

            },

          ]


  }

  startApp() {
    this.navCtrl.setRoot(WelcomePage, {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
