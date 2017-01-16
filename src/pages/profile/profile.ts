import { Component } from '@angular/core';
import {NavController, ActionSheetController, ViewController, ModalController} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {Django} from "../../providers/django";
import {OptionsPage} from "../options/options";
import {ImageModalPage} from "../../modals/image-modal/image-modal";

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

  constructor(public navCtrl: NavController,
              public storage: Storage,
              public actionSheetCtrl: ActionSheetController,
              public nav: NavController,
              public peopleService:Django,
              public  modalCtrl:ModalController,
              public viewCtrl:ViewController
  ) {}
  /*
    logOut(){
        this.AuthData.logoutUser().then(() => {
            this.nav.setRoot(LoginPage);
        });
    }
*/
  ionViewDidLoad() {
    console.log('Hello GalleryPage Page');
  }

  ionViewDidEnter() {

    this.peopleService.loadPeople().subscribe(data => {
      this.people = data;
      this.rows = Array.from(Array(Math.ceil(data.length / 3)).keys());
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
