import { Component } from '@angular/core';
import { Facebook, NativeStorage } from 'ionic-native';
import { NavController } from 'ionic-angular';
import {HomePage} from "../home/home";
import {TabsPage} from "../tabs/tabs";
/*
  Generated class for the Facebook page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-facebook',
  templateUrl: 'facebook.html'
})
export class FacebookPage {

  FB_APP_ID: number = 217346605391216;

  constructor(public navCtrl: NavController) {
    Facebook.browserInit(this.FB_APP_ID, "v2.8");
  }

  doFbLogin(){
    let permissions = new Array();
    let nav = this.navCtrl;
    //the permissions your facebook app needs from the user
    permissions = ["public_profile"];


    Facebook.login(permissions)
        .then(function(response){
          let userId = response.authResponse.userID;
          let params = new Array();

          //Getting name and gender properties
          Facebook.api("/me?fields=name,gender", params)
              .then(function(user) {
                user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
                //now we have the users info, let's save it in the NativeStorage
                NativeStorage.setItem('user',
                    {
                      name: user.name,
                      gender: user.gender,
                      picture: user.picture
                    })
                    .then(function(){
                      nav.push(TabsPage);
                    }, function (error) {
                      console.log(error);
                    })
              })
        }, function(error){
          console.log(error);
        });
  }


}
