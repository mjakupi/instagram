import { Component } from '@angular/core';
import { Photo } from '../../photo/photo';


import {NavController} from 'ionic-angular';
import {Django} from "../../providers/django";
import {ProfilePage} from "../profile/profile";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    public comment:string;
    public i;
    public eventList:any;
    people:any;

    constructor(public navCtrl:NavController, public peopleService:Django) {

    }

    photos:Photo[] = [new Photo("http://placehold.it/350x150", 10), new Photo("http://placehold.it/350x151", 6), new Photo("http://placehold.it/350x151", 6), new Photo("http://placehold.it/350x151", 6)];


    deletePhoto(photo) {
        this.photos.splice(this.photos.indexOf(photo), 1);
    }

    likePhoto(photo) {
        photo.likes++;
    }


    createEvent(eventName):any {
        return this.eventList.push({
            name: eventName
        })
    }

    ionViewDidEnter() {

        this.peopleService.loadPeople().subscribe(data => {
            this.people = data;

        });

    }

    goToProfile()
    {
        this.navCtrl.push(ProfilePage)
    }

}
