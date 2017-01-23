import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {SignupPage} from "../signup/signup";
import { Facebook, NativeStorage } from 'ionic-native';
import {TabsPage} from "../tabs/tabs";
import {Http} from "@angular/http";
import {TakePhotoPage} from "../take-photo/take-photo";

/*
  Generated class for the Welcome page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
    FB_APP_ID: number = 217346605391216;


  constructor(public navCtrl: NavController,public http: Http ,public navParams: NavParams,private toastCtrl: ToastController) {
      Facebook.browserInit(this.FB_APP_ID, "v2.8");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }
    presentToast() {
        let toast = this.toastCtrl.create({
            message: 'You have successfully logged in.',
            duration: 3000,
            position: 'middle'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }

  login(){
    this.navCtrl.push(LoginPage);

  }
    signup(){
        this.navCtrl.push(SignupPage);
    }
    djangoLogin(){
        this.navCtrl.push(TakePhotoPage);
    }

    FBLogin(){
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
