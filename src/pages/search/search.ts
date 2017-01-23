import { Component } from '@angular/core';
import {NavController, LoadingController, ActionSheetController, ModalController} from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ProfilePage} from "../profile/profile";
import {MapPage} from "../../modals/map/map";

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  private posts: any; // <- I've added the private keyword
  public items: any; // <- items property is now of the same type as posts
  constructor(private http: Http, private loadingCtrl: LoadingController,
              public actionSheetCtrl: ActionSheetController,
              public navCtrl:NavController,
              public modalCtrl: ModalController,

  ) {
    // this.initializeItems(); <- you don't need this anymore


    // Show the loading message
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading posts...'
    });

    //noinspection TypeScriptUnresolvedFunction
    this.http.get('http://ec2-35-156-212-193.eu-central-1.compute.amazonaws.com/insta/').map(res => res.json()).subscribe(data => {
      this.posts = data;
      this.initializeItems();

      // Hide the loading message
      loadingPopup.dismiss();
    });
  }

  presentProfileModal() {
    let profileModal = this.modalCtrl.create(MapPage, { userId: 8675309 });
    profileModal.present();
  }




  initializeItems() {
    this.items = this.posts;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '')
    {
      {
        this.items = this.items.filter((item) => {
          return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }    }

  }
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose any action',
      buttons: [
        {
          text: 'View Profile',
          handler: () => {
            this.navCtrl.push(ProfilePage);
            console.log('Destructive clicked');
          }
        },{
          text: 'Hide',
          role: 'destructive',
          handler: () => {
            console.log('Hide clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  openItem()
  {
    this.navCtrl.push(ProfilePage);
  }

}