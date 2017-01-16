import { Component } from '@angular/core';

/*
  Generated class for the You component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'you',
  templateUrl: 'you.html'
})
export class YouComponent {

  text: string;

  constructor() {
    console.log('Hello You Component');
    this.text = 'Hello World';
  }

}
