import { Component } from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import {LikesPage} from "../../pages/likes/likes";

/*
  Generated class for the Following component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'following',
  templateUrl: 'following.html'
})
export class FollowingComponent {

  text: string;
  user: any = {};


  constructor(public navCtrl:NavController) {
    console.log('Hello Following Component');
    this.text = 'Hello World';
  }



}
