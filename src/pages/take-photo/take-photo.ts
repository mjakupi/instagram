import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Headers, Http, RequestOptions} from "@angular/http";
import {TabsPage} from "../tabs/tabs";
import { Storage } from '@ionic/storage';


/*
  Generated class for the TakePhoto page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-take-photo',
  templateUrl: 'take-photo.html'
})
export class TakePhotoPage {
  url: string = 'http://ec2-35-156-212-193.eu-central-1.compute.amazonaws.com:8080/auth/login/';
  localUrlRegister: string = 'http://127.0.0.1:8000/auth/login/';
  loginData = {
    username:'',
    password:'',
  };


  constructor(public navCtrl:NavController, public http:Http, public storage: Storage) {

  }

  ionViewDidLoad() {
    console.log('Hello TakePhotoPage Page');
  }

  djangoLogin(){
    let headers = new Headers({ 'Content-Type': 'application/json',
      Accept: 'application/json'});
    let options = new RequestOptions({ headers: headers });
    let nav = this.navCtrl;
    return this.http.post(this.localUrlRegister,JSON.stringify(this.loginData), options)
        .map(res => res.json())
        .subscribe(
            data => {
                this.storage.set('data',
                    {
                        username: data.username,
                        auth_token: data.auth_token
                    })
              nav.push(TabsPage);
                console.log('this is token ->',data.auth_token);
                console.log('this is username ->',data.username);
            },
            err => {
              console.log("ERROR!: ", err);

            }
        );

  }

}
