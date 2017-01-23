import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController, ViewController, Platform} from 'ionic-angular';
import {Locations} from "../../providers/locations";
import {GoogleMaps} from "../../providers/google-maps";


/*
  Generated class for the Map page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'

})
export class MapPage {
    @ViewChild('map') mapElement: ElementRef;
    @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
  map:any;
    constructor(public navCtrl: NavController,public viewCtrl:ViewController,public maps: GoogleMaps, public platform: Platform, public locations: Locations) {

    }

    ionViewDidLoad(){

        this.platform.ready().then(() => {

            let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
            let locationsLoaded = this.locations.load();

            Promise.all([
                mapLoaded,
                locationsLoaded
            ]).then((result) => {

                let locations = result[1];

                for(let location of locations){
                    this.maps.addMarker();
                }

            });

        });


    }

    addMarker() {
        this.maps.addMarker();
    }


    close() {
        this.viewCtrl.dismiss(); // This works fine
    }
}

    /*
  initMap(){
      Geolocation.getCurrentPosition().then((position) => {
      //noinspection TypeScriptUnresolvedVariable
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      //noinspection TypeScriptUnresolvedVariable
      var myOptions = {
          zoom: 8,
          center: latLng,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };
    //noinspection TypeScriptUnresolvedVariable
      this.map = new google.maps.Map(this.mapElement.nativeElement,myOptions);
  },
          (err) => {
          console.log(err);
      });
  }

    addMarker(){

        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: this.map.getCenter()
        });

        let content = "<h4>Im here !</h4>";

        this.addInfoWindow(marker, content);

    }

    addInfoWindow(marker, content){

        let infoWindow = new google.maps.InfoWindow({
            content: content
        });

        google.maps.event.addListener(marker, 'click', () => {
            infoWindow.open(this.map, marker);
        });

    }
*/



