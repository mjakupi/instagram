import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {Camera} from "ionic-native";
import {Platform} from "ionic-angular";
import firebase from 'firebase';


/*
  Generated class for the FirebaseService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
declare var window;
@Injectable()
export class FirebaseService {

  photos: FirebaseListObservable<any>;
    images:any;
    assetCollection:any;
    rows:any;
    public recipeList: any;
    public profilePictureRef: any;
    public recipePicture:any;

  constructor(public platform: Platform,public http: Http,private af: AngularFire) {
    console.log('Hello FirebaseService Provider');
      this.recipeList = firebase.database().ref('/pictureList');
      this.profilePictureRef = firebase.storage().ref('/insta/');
  }

    doGetPicture() {
        // TODO:
        // get picture from camera
        //noinspection TypeScriptUnresolvedVariable
        Camera.getPicture({
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            targetHeight:300,
            correctOrientation: true
        }).then((_imagePath) => {
            alert('got image path ' + _imagePath);
            // convert picture to blob
            return this.makeFileIntoBlob(_imagePath);
        }).then((_imageBlob) => {
            alert('got image blob ' + _imageBlob);

            // upload the blob
            return this.uploadToFirebase(_imageBlob);
        }).then((_uploadSnapshot: any) => {
            alert('file uploaded successfully  ' + _uploadSnapshot.downloadURL);

            // store reference to storage in database
            return this.saveToDatabaseAssetList(_uploadSnapshot);

        }).then((_uploadSnapshot: any) => {
            alert('file saved to asset catalog successfully  ');
        }, (_error) => {
            alert('Error ' + _error.message);
        });



    }


    makeFileIntoBlob(_imagePath) {

        // INSTALL PLUGIN - cordova plugin add cordova-plugin-file
        if (this.platform.is('android')) {
            return new Promise((resolve, reject) => {
                window.resolveLocalFileSystemURL(_imagePath, (fileEntry) => {

                    fileEntry.file((resFile) => {

                        var reader = new FileReader();
                        reader.onloadend = (evt: any) => {
                            var imgBlob: any = new Blob([evt.target.result], { type: 'image/jpeg' });
                            imgBlob.name = 'sample.jpg';
                            resolve(imgBlob);
                        };

                        reader.onerror = (e) => {
                            console.log('Failed file read: ' + e.toString());
                            reject(e);
                        };

                        reader.readAsArrayBuffer(resFile);
                    });
                });
            });
        }
    }

    uploadToFirebase(_imageBlob) {
        var fileName = 'sample-' + new Date().getTime() + '.jpg';

        return new Promise((resolve, reject) => {
            var fileRef = firebase.storage().ref('images/' + fileName);

            var uploadTask = fileRef.put(_imageBlob);

            uploadTask.on('state_changed', (_snapshot) => {
                console.log('snapshot progess ' + _snapshot);
            }, (_error) => {
                reject(_error);
            }, () => {
                // completion...
                resolve(uploadTask.snapshot);
            });
        });
    }

    saveToDatabaseAssetList(_uploadSnapshot) {
        var ref = firebase.database().ref('assets');

        return new Promise((resolve, reject) => {

            // we will save meta data of image in database
            var dataToSave = {
                'URL': _uploadSnapshot.downloadURL, // url to access file
                'id' : _uploadSnapshot.id,
                'name': _uploadSnapshot.metadata.name, // name of the file
                'lastUpdated': new Date().getTime(),
            };

            ref.push(dataToSave, (_response) => {
                resolve(_response);
            }).catch((_error) => {
                reject(_error);
            });
        });

    }
    addPicture( guestPicture = null): any {
        return this.recipeList.child('PictureList').push({

        }).then((newPicture) => {
            this.recipeList.transaction( (event) => {
                return event;
            });
            if (guestPicture != null) {
                this.profilePictureRef.child(newPicture.key).child('recipePicture.png')
                    .putString(guestPicture, 'base64', {contentType: 'image/png'})
                    .then((savedPicture) => {
                        this.recipeList.child('recipePicture')
                            .set(savedPicture.downloadURL);
                    });
            }
        });
    }


    takePicture(){
        //noinspection TypeScriptUnresolvedVariable
        Camera.getPicture({
            quality : 95,
            destinationType : Camera.DestinationType.DATA_URL,
            allowEdit : true,
            encodingType: Camera.EncodingType.PNG,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: true
        }).then(imageData => {
            this.recipePicture = imageData;
            return this.addPicture(this.recipePicture);
        }),error => {
            console.log("ERROR -> " + JSON.stringify(error));
        };
    }


}



