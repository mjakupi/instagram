import {Component} from '@angular/core';
import {NavController, AlertController, ModalController} from 'ionic-angular';
import {Django} from "../../providers/django";
import {ProfilePage} from "../profile/profile";
import {FirebaseListObservable, AngularFire} from 'angularfire2';
import {LikeModalPage} from "../../modals/like-modal/like-modal";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    people:any;
    public tap: number = 0;
    photos: FirebaseListObservable<any>;
    constructor(public navCtrl:NavController,public modalCtrl:ModalController,public alertCtrl:AlertController,private af: AngularFire,public peopleService:Django) {

    }
    tapEvent(e) {
        this.showAlert();
       // this.presentProfileModal();
       this.tap++;
    }
    ionViewDidEnter() {
        this.peopleService.loadPeople().subscribe(data => {
            this.people = data;
        });

    }
    showLike() {
    let alert = this.alertCtrl.create({
        title: 'You cant like twice',
        subTitle: '',
        buttons: ['OK']
    });
    alert.present();
}

    showAlert() {
        let alert = this.alertCtrl.create({
            title: 'Liked',
            subTitle: '',
            buttons: ['OK']
        });
        alert.present();
    }
    presentProfileModal() {
        let imgModal = this.modalCtrl.create(LikeModalPage);

        imgModal.present();
    }
    goToProfile()
    {
        this.navCtrl.push(ProfilePage);
    }

}
