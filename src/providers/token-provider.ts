import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the TokenProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TokenProvider {

  tokenName:string;
  constructor() {
    this.tokenName = 'Auth-token';

  }

  getToken() {
    return localStorage.getItem('Auth-Token');
  }

  setToken(token) {
    return localStorage.setItem('Auth-Token', token);
  }

  removeToken() {
    localStorage.removeItem('Auth-Token');
  }


}
