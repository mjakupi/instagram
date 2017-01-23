import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Sharedvars provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Sharedvars {
  localLogout: string = 'http://127.0.0.1:8000/auth/logout';
  localLogin: string = 'http://127.0.0.1:8000/auth/login/';
  localReset: string = 'http://127.0.0.1:8000/auth/password/reset/';
  localRegister: string = 'http://127.0.0.1:8000/auth/register/';
  localUsers: string ='http://127.0.0.1:8000/insta/user1/';
  localPosts: string ='http://127.0.0.1:8000/insta/';

  logout: string = 'http://ec2-35-156-212-193.eu-central-1.compute.amazonaws.com/auth/logout/';
  resetPassword: string = 'http://ec2-35-156-212-193.eu-central-1.compute.amazonaws.com/auth/password/reset/';
  login: string = 'http://ec2-35-156-212-193.eu-central-1.compute.amazonaws.com/auth/login/';
  register: string = 'http://ec2-35-156-212-193.eu-central-1.compute.amazonaws.com/auth/register/';
  constructor(public http: Http) {
    console.log('Hello Sharedvars Provider');
  }

  getLogin(){
    return this.login
  }
  getLogout(){
    return this.logout
  }
  getReset(){
    return this.resetPassword
  }
  getRegister(){
    return this.register
  }
  getLocalLogin(){
    return this.localLogin
  }
  getLocalRegister(){
    return this.localRegister
  }
  getLocalUsers(){
    return this.localUsers
  }
  getLocalPosts(){
    return this.localPosts
  }
  getLocalReset(){
    return this.localReset
  }

}
