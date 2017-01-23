import { Component } from '@angular/core';
import {NavController, ActionSheetController, ViewController, ModalController} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {Django} from "../../providers/django";
import {OptionsPage} from "../options/options";
import {ImageModalPage} from "../../modals/image-modal/image-modal";
import {FirebaseService} from "../../providers/firebase-service";

import firebase from 'firebase';

/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  username : string;
  people: any;
  rows:any;
  firebaseImages:any;
  assetCollection:any;

  constructor(public navCtrl: NavController,
              public storage: Storage,
              public actionSheetCtrl: ActionSheetController,
              public nav: NavController,
              public firebase:FirebaseService,
              public peopleService:Django,
              public  modalCtrl:ModalController,
              public viewCtrl:ViewController
  ) {}

  ionViewDidEnter() {
    firebase.database().ref('assets').on('value', (_snapshot:any) => {
      var result = [];

      _snapshot.forEach((_childSnapshot) => {
        // get the key/id and the data for display
        var element = _childSnapshot.val();
        element.id = _childSnapshot.key;
        result.push(element);
        //this.firebaseImages.push(element);
          console.log(result);
      });

      // set the component property
      this.assetCollection = result;
      this.rows = Array.from(Array(Math.ceil(this.assetCollection.length / 3)).keys());

    });
    }


  presentProfileModal() {
    let imgModal = this.modalCtrl.create(ImageModalPage);
    imgModal.present();
  }
    tap(){
      this.presentProfileModal();
    }
  goToOptions()
  {
    this.navCtrl.push(OptionsPage);
  }
}
