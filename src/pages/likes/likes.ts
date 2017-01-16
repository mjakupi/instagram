import { Component} from '@angular/core';

import {NavController, ViewController,} from 'ionic-angular';

import {Http, Headers} from "@angular/http";

import { Camera } from 'ionic-native';
import {DomSanitizer} from "@angular/platform-browser";


@Component({
  selector: 'page-likes',
  templateUrl: 'likes.html'
})
export class LikesPage {
    name:string;
    league:string;
    lname:string;
    photo:'http://ec2-35-156-212-193.eu-central-1.compute.amazonaws.com/media/bgswirlstran_4AmDJPW.png';
    url = 'http://ec2-35-156-212-193.eu-central-1.compute.amazonaws.com/insta/';
    url1 = 'http://ec2-35-156-212-193.eu-central-1.compute.amazonaws.com/team/';
    data:any = {};
    public base64Image: string;


    constructor(public navCtrl:NavController,
                public viewCtrl:ViewController,
                public http:Http,
                private sanitizer: DomSanitizer
    ) {
        this.data.response = '';
    }

    close() {
        this.viewCtrl.dismiss();
    }

    takePicture(){

        //noinspection TypeScriptUnresolvedVariable
        Camera.getPicture({
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType     : Camera.PictureSourceType.PHOTOLIBRARY,
            mediaType: Camera.MediaType.PICTURE
        }).then((imageData) => {
            // imageData is a base64 encoded string
            this.base64Image = "data:image/jpeg;base64," + imageData;
        }, (err) => {
            console.log(err);
        });
    }

    postTeams(){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let data = {
            name: this.name,
            league: this.league,
        };

        this.http
            .post(this.url1, data, headers)
            .map(res => res.json())
            .subscribe(
                data => {
                    this.data.response =  data.toString();
                    console.log(data);
                },
                err => {
                    console.log("ERROR!: ", err);
                }
            );

    }



    submit(){

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let data = {
            name: this.name,
            lname: this.lname,
        };


        this.http
            .post(this.url, data, headers)
            .map(res => res.json())
            .subscribe(
                data => {
                    console.log(data);
                },
                err => {
                    console.log("ERROR!: ", err);
                }
            );

    /*
        this.http.post(this.url, JSON.stringify(body), {headers: headers})
            .subscribe(res => {
                console.log(res.json());
            }, (err) => {
                console.log(err);
            });
   */

    }






}



