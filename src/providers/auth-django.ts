import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {TokenProvider} from './token-provider'
import {Sharedvars} from "./sharedvars";

/*
  Generated class for the AuthDjango provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthDjango {
    public auth_token:any;
    public  username:any;
    public id:any;
    constructor(public http: Http,
                public tokenProvider:TokenProvider,
                public sharedVars:Sharedvars,
                ) {

    console.log('Hello AuthDjango Provider');
        this.tokenProvider = tokenProvider;

    }
    createAuthorizationHeader(headers:Headers) {
        headers.append('Authorization', 'Token ' + this.tokenProvider.getToken());

    }



    loginDjango(credentials){

        return new Promise((resolve, reject) => {
            let body = JSON.stringify(credentials);
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept','application/json');
            this.http.post(this.sharedVars.getLogin(),body, {headers: headers})
                .subscribe(res => {
                    let data = res.json();
                    window.localStorage.setItem('userLoggedIn','1');
                    window.localStorage.setItem('displayName','Metin');


                        this.tokenProvider.setToken(data.auth_token);
                    resolve(data);
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });

        });

    }


    resetPassword(credentials){

        return new Promise((resolve, reject) => {
            let body = JSON.stringify(credentials);
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept','application/json');
            this.http.post(this.sharedVars.getLocalReset(),body, {headers: headers})
                .subscribe(res => {
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
            this.http.post(this.sharedVars.getLogout(), options)
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
            this.http.post(this.sharedVars.getLocalRegister(), JSON.stringify(details), {headers: headers})
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
