///<reference path="../../node_modules/rxjs/src/Observable.ts"/>
import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {TokenProvider} from './token-provider'

import {TabsPage} from "../pages/tabs/tabs";
import {WelcomePage} from "../pages/welcome/welcome";

/*
  Generated class for the AuthDjango provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthDjango {
  localLogout: string = 'http://127.0.0.1:8000/auth/logout';
  localLogin: string = 'http://127.0.0.1:8000/auth/login/';
  localMe: string = 'http://127.0.0.1:8000/auth/login/';
  localRegister: string = 'http://127.0.0.1:8000/auth/register/';

    logout: string = 'http://ec2-35-156-212-193.eu-central-1.compute.amazonaws.com/auth/logout/';
    login: string = 'http://ec2-35-156-212-193.eu-central-1.compute.amazonaws.com/auth/login/';
    register: string = 'http://ec2-35-156-212-193.eu-central-1.compute.amazonaws.com/auth/register/';
    public auth_token:any;
    public  username:any;

    constructor(public http: Http,public tokenProvider:TokenProvider) {
    console.log('Hello AuthDjango Provider');
        this.tokenProvider = tokenProvider;

    }





    loginDjango(credentials){

        return new Promise((resolve, reject) => {

            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept','application/json');
            this.http.post(this.localLogin, JSON.stringify(credentials), {headers: headers})
                .subscribe(res => {

                    let data = res.json();
                    this.auth_token = data.auth_token;
                    this.tokenProvider.setToken(data.auth_token);
                    resolve(data);
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });

        });

    }


    logoutDjango() {
        return new Promise(resolve => {

            let headers = new Headers ();
            this.tokenProvider.getToken();
            headers.append('Authorization','Token ' + this.tokenProvider.getToken());
            var options = new RequestOptions({headers: headers});
            this.http.post(this.localLogout, options)
                .subscribe(
                    data => {
                        this.tokenProvider.removeToken();
                        resolve(data);
                    },
                    err => {
                        console.log("ERROR!: ", err);

                    }
                );
        })
    }
    createAccount(details){

        return new Promise((resolve, reject) => {

            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            this.http.post(this.localRegister, JSON.stringify(details), {headers: headers})
                .subscribe(res => {

                    let data = res.json();
                    this.auth_token = data.auth_token;
                    this.tokenProvider.setToken(data.auth_token);
                    resolve(data);

                }, (err) => {
                    reject(err);
                });

        });

    }



}
