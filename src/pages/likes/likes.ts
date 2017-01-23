import { Component} from '@angular/core';


//noinspection TypeScriptCheckImport
import { AngularFire, FirebaseListObservable} from 'angularfire2';
import {NavController} from "ionic-angular/index";
import {Django} from "../../providers/django";


@Component({
  selector: 'page-likes',
  templateUrl: 'likes.html'
})
export class LikesPage {
    firelist: FirebaseListObservable<any>;
    chat: any;
    people:any;
    constructor(public nav: NavController, public postService:Django,public af: AngularFire) {
        this.firelist = this.af.database.list('/chat', { //mengambil data
            query: {
                orderByChild: 'negativtimestamp',
            }
        });
    }
    ionViewDidEnter() {
        this.postService.loadPeople().subscribe(data => {
            this.people = data;
        });

    }
    chatSend(va, vi) {
        this.af.database.list('/chat').push({
            username: window.localStorage.getItem('displayName'),
            chat_text: va.chatText,
            timestamp: Date.now(),
            negativtimestamp: -Date.now()
        })
        this.chat = '';
    }
}



