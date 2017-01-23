import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Sharedvars} from "./sharedvars";

/*
 Generated class for the Django provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class Django {
  insta: string = 'http://ec2-35-156-212-193.eu-central-1.compute.amazonaws.com/insta/';
  localUrl: string = 'http://127.0.0.1:8000/insta/6';

  constructor(public http: Http,public sharedVars:Sharedvars) {
    console.log('Hello Django Provider');
  }

  loadPeople()
  {
    let headers = new Headers({ 'Content-Type': 'application/json',
      Accept: 'application/json'});
    let options = new RequestOptions({ headers: headers });
    //noinspection TypeScriptUnresolvedFunction
    return this.http.get(this.insta,options)
        .map(res=> res.json());
  }

  loadPosts(){
    let headers = new Headers({'Content-Type':'application/json',Accept: 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.get(this.sharedVars.getLocalPosts(),options)
        .map(res=> res.json());
  }
  loadRecipes(){
    let headers = new Headers({'Content-Type':'application/json',Accept: 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.get(this.localUrl,options)
        .map(res=> res.json());
  }

}
